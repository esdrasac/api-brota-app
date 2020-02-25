const log = require('../../config/logger');
const UserSchema = require('../schemas/UserSchema');
const File = require('../models/File');

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    let file;
    try {
      file = await File.create({
        name,
        path,
      });

      const userMongo = await UserSchema.findOne({ id: req.userId });
      userMongo.avatar_id = {
        name,
        path,
      };

      await userMongo.save();
    } catch (err) {
      log.error(err);
    }


    return res.json(file);
  }
}

module.exports = new FileController();
