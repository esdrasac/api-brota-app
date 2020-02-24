require('dotenv/config');

const express = require('express');

const routes = require('./routes');

require('./database');

class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.router();
  }

  middleware() {
    this.server.use(express.json());
  }

  router() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
