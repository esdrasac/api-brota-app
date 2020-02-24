require('dotenv').config({ path: './.env' });

const app = require('./app');

const log = require('./config/logger');

app.listen(process.env.PORT, () => {
  log.info(`Application listening on PORT[${process.env.PORT}]`);
});
