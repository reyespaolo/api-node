import mongoose from 'mongoose';
import { Router } from 'express';
import User from '../model/user';
import { bodyParser } from 'body-parser';
const _ = require('lodash')

export default({ config, db }) => {
  let api = Router();

  api.post('/add', (req, res) => {
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);

    user.save().then((user) => {
      res.send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
  });


  return api;
}
