import express from 'express';
import middleware from '../middleware';
import mongoose from '../db';
import template from '../controller/template'
import users from '../controller/user'

let router = express();


  // API Routes
  router.use('/template', template({ mongoose }));
  router.use('/users', users({ mongoose }));



export default router;
