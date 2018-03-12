import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let templateSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Template', templateSchema)
