const app = require('./app');

const log = require('./config/logger');

log.info(process.env.MYSQL_USER);

app.listen(process.env.PORT, () => {
  log.info(`Application listening on PORT[${process.env.PORT}]`);
});
