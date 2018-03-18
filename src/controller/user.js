import mongoose from 'mongoose';
import { Router } from 'express';
import { bodyParser } from 'body-parser';
import User from '../model/user';
import { authenticate } from '../middleware/authenticate';

const _ = require('lodash')

export default({ db }) => {
  let api = Router();

  api.post('/', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    var user = new User(body)
    user.save()
      .then(() => {
        return user.generateAuthToken()
      })
      .then((token) => {
        res.status(200).header('x-auth', token).send(user)
      })
      .catch((e) => {
        res.status(400).send(e)
      })
  });

  api.get('/me', authenticate, (req, res) => {
    res.send(req.user)
  });

  api.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    User.findByCredentials(body.email,body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.status(200).header('x-auth', token).send(user)
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


  return api;
}
