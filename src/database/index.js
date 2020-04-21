const Sequelize = require('sequelize');
const mongoose = require('mongoose');
const redis = require('async-redis');

const dbConfig = require('../config/database');
const User = require('../app/models/User');
const File = require('../app/models/File');

const models = [User, File];

class Database {
  constructor() {
    this.init();
    this.mongo();
    this.redis();
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
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: true,
      },
    );
  }

  redis() {
    this.client = redis.createClient();
    this.client.on('connect', () => {
      console.log('redis connected');
    });
  }
}

module.exports = new Database();
