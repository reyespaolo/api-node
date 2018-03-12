import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let templateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  geometry: {
    type: {type: String, default: 'Point'},
    coordinates: [Number]
  }
});

module.exports = mongoose.model('Template', templateSchema)
