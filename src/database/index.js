const Sequelize = require('sequelize');
const mongoose = require('mongoose');

const dbConfig = require('../config/database');
const User = require('../app/models/User');
const File = require('../app/models/File');

const models = [User, File];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongooseConnection = mongoose.connect(
      'mongodb://localhost:27017/my_gossip',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
      },
    );
  }
}

module.exports = new Database();
