import mongoose from 'mongoose';
import { Router } from 'express';
import Template from '../model/template';
import { bodyParser } from 'body-parser';

const _ = require('lodash')

export default({ config, db }) => {
  let api = Router();

  // '/v1/restaurant/add'
  api.post('/add', (req, res) => {
    let newTemp = new Template();
    newTemp.name = req.body.name;

    newTemp.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Restaurant saved successfully' });
    });
  });
  return api;
}
