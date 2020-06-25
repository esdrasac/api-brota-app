const { Router } = require('express');
const multer = require('multer');

const multerConfig = require('./config/multer');
const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const LikeController = require('./app/controllers/LikeController');
const DislikeController = require('./app/controllers/DislikeController');
const SessionController = require('./app/controllers/SessionController');
const NotificationController = require('./app/controllers/NotificationController');
const FileController = require('./app/controllers/FileController');
const FeedController = require('./app/controllers/FeedController');

const route = new Router();
const upload = multer(multerConfig);

route.post('/user', UserController.store);
route.post('/session', SessionController.store);

route.use(authMiddleware);

route.get('/user', UserController.index);
route.put('/user', UserController.update);

route.get('/feed', FeedController.index);
route.get('/feed/get-by-id', FeedController.indexById);
route.post('/feed/post', FeedController.store);
route.post('/feed/:postId/like', FeedController.like);
route.post('/feed/:id/coment', FeedController.setComent);

route.get('/notifications', NotificationController.index);
route.put('/notifications/:id', NotificationController.update);

route.post('/user/:targetId/likes', LikeController.store);
route.post('/user/:targetId/dislikes', DislikeController.store);

route.post('/files', upload.single('file'), FileController.store);


module.exports = route;
