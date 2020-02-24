const { Router } = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const app = new Router();

app.post('/user', UserController.store);
app.post('/session', SessionController.store);

app.use(authMiddleware);
app.put('/user', UserController.update);


module.exports = app;
