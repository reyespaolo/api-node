import mongoose from 'mongoose';
import { Router } from 'express';
import Template from '../model/template';
import { bodyParser } from 'body-parser';

const _ = require('lodash')

export default({ config, db }) => {
  let api = Router();

  // '/v1/restaurant/add'
  api.post('/add', (req, res) => {
    var body = _.pick(req.body, ['name'])
    let newTemp = new Template(body);

    newTemp.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Template saved successfully' });
    });
  });

  // Read All
  api.get('/', (req, res) =>{
    Template.find({}, (err, temp) => {
      if(err){
        res.send(err);
      }
      res.json(temp);
    });
  });

  // Read per ID Read 1
  api.get('/:id',(req, res) => {
    Template.findById(req.params.id, (err, temp) => {
      if(err){
        res.send(err);
      }
      res.json(temp);
    });
  });

  api.put('/:id', (req, res) => {
    Template.findById(req.params.id, (err, temp) => {
      if(err){
        res.send(err);
      }
      var body = _.pick(req.body, ['name'])
      temp.name = body.name
      temp.save(err => {
        if(err){
          res.send(err)
        }
        res.json({
          message: "Restaurant Info Updated",
          data: temp
        });
      });
    });
  });

  api.delete('/:id', (req, res) => {
    Template.remove({
      _id:req.params.id
    }, (err, template) =>{
      if(err){
        res.send(err);
      }
      res.json({
        message: "Template Successfully Removed",
        data: template
      })
    })
  })

  return api;
}
