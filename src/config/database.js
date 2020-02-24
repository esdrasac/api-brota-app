require('dotenv/config');

module.exports = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
