import mongoose from 'mongoose';
import validator from 'validator';
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate:{
      validator: validator.isEmail,
      message: '{VALUE} is not a valid Email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access:{
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true

    }
  }]
});

module.exports = mongoose.model('User', UserSchema)
