import mongoose from 'mongoose';
import { Router } from 'express';
import { bodyParser } from 'body-parser';
import User from '../model/user';
import { authenticate } from '../middleware/authenticate';
import gravatar from 'gravatar';
const passport = require('passport');

// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');
const _ = require('lodash')
// passport.use(
//   new GoogleStrategy({
//     callbackURL:'/v1/auth/users/google/redirect',
//     clientID: process.env.GOOGLE_CLIENTID,
//     clientSecret: process.env.GOOGLE_CLIENTSECRET
//   },(accessToken,refreshToken,profile,done) => {
//     console.log(profile)
//     return done(null, profile)
//   })
// )

export default({ db }) => {
  let api = Router();

  api.post('/', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    const avatar = gravatar.url(body.email, {
      s:200, // size
      r: 'pg', //rating
      d: 'mm' // default
    })
    body.avatar = avatar;
    var user = new User(body)
    user.save()
      .then(() => {
        return user.generateAuthToken()
      })
      .then((token) => {
        res.status(200).header('Bearer', token).send(user)
      })
      .catch((e) => {
        res.status(400).send(e)
      })
  });

  api.get('/me', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.send(req.user)
  });

  api.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    User.findByCredentials(body.email,body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.status(200).header('Authorization', token).send(user)
      })
    }).catch((err) => {
      res.status(400).send();
    });
  });

  api.delete('/me/logout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    });
  });

  // api.get('/google',passport.authenticate('google',{
  //   scope:['profile', 'email']
  // }));
  //
  // api.get('/google/redirect', passport.authenticate('google',{ session: false }), (req,res) => {
  //   res.send("you reached the call back URL")
  // })
  //

  return api;
}
