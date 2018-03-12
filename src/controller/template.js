import mongoose from 'mongoose';
import { Router } from 'express';
const { ObjectID } = require('mongodb');
import { bodyParser } from 'body-parser';

import Template from '../model/template';


const _ = require('lodash')

export default({ config, db }) => {
  let api = Router();

  api.post('/add', (req, res) => {
    var body = _.pick(req.body, ['name'])
    var newTemp = new Template(body);

    newTemp.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });

  api.get('/', (req, res) => {
    Template.find().then((template) => {
      res.send({template});
    }, (e) => {
      res.status(400).send(e);
    });
  });

  api.get('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Template.findById(id).then((template) => {
      if (!template) {
        return res.status(404).send();
      }
      res.send({template});
    }).catch((e) => {
      res.status(400).send();
    });
  });

  api.delete('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Template.findByIdAndRemove(id).then((template) => {
      if (!template) {
        return res.status(404).send();
      }

      res.send({template});
    }).catch((e) => {
      res.status(400).send();
    });
  });

  api.patch('/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['name']);

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    Template.findByIdAndUpdate(id, {$set: body}, {new: true}).then((template) => {
      if (!template) {
        return res.status(404).send();
      }
      res.send({template});
    }).catch((e) => {
      res.status(400).send();
    })
  });



  return api;
}
