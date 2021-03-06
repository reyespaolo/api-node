import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const passport = require('passport');

const _ = require('lodash');

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
  avatar: {
    type: String
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


UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  const payload = { _id: user.id, email:user.email, avatar: user.avatar }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600*24*7});
  return user.save().then(() => {
    return token
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull:{
      tokens: {token}
    }
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }catch (e) {
    return Promise.reject();

  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })

}

UserSchema.statics.findByCredentials = function (email,password){
  var User = this;

  return User.findOne({email}).then((user) => {
    if(!user){
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res){
          resolve(user);
        }else{
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10, (err,salt) =>{
      bcrypt.hash(user.password, salt, (err, hash) =>{
      user.password = hash;
      next();
      });
    });
  }else{
    next();
  }
});

module.exports = mongoose.model('User', UserSchema)
