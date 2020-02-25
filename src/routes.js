const { Router } = require('express');
const multer = require('multer');

const multerConfig = require('./config/multer');
const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const LikeController = require('./app/controllers/LikeController');
const DislikeController = require('./app/controllers/DislikeController');
const SessionController = require('./app/controllers/SessionController');
const FileController = require('./app/controllers/FileController');

const app = new Router();
const upload = multer(multerConfig);

app.post('/user', UserController.store);
app.post('/session', SessionController.store);

app.use(authMiddleware);

app.get('/user', UserController.index);
app.put('/user', UserController.update);

app.post('/user/:targetId/likes', LikeController.store);
app.post('/user/:targetId/dislikes', DislikeController.store);

app.post('/files', upload.single('file'), FileController.store);


module.exports = app;
