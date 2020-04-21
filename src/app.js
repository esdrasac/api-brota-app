require('dotenv/config');
require('express-async-errors');

const express = require('express');
const http = require('http');
const io = require('socket.io');
const Sentry = require('@sentry/node');
const Youch = require('youch');
const path = require('path');
const cors = require('cors');

const routes = require('./routes');
const sentryConfig = require('./config/sentry');

const { client } = require('./database');

class App {
  constructor() {
    this.httpServer = express();
    this.server = http.Server(this.httpServer);
    this.io = io(this.server);

    this.io.on('connection', (socket) => {
      const { user } = socket.handshake.query;

      console.log(user);

      client.set(user, socket.id);
    });

    Sentry.init(sentryConfig);

    this.middleware();
    this.router();
    this.exceptionHandler();
  }

  middleware() {
    this.httpServer.use(Sentry.Handlers.requestHandler());
    this.httpServer.use(cors());
    this.httpServer.use(express.json());
    this.httpServer.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
    );
    this.httpServer.use((req, res, next) => {
      req.io = this.io;
      req.redis = client;

      return next();
    });
  }

  router() {
    this.httpServer.use(routes);
    this.httpServer.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.httpServer.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();

      return res.status(500).json(errors);
    });
  }
}

module.exports = new App().server;
