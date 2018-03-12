import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let templateSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Template', templateSchema)
