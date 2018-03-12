import express from 'express';
import { config } from '../config'
import middleware from '../middleware';
import mongoose from '../db';
import template from '../controller/template'
import users from '../controller/user'

let router = express();


  // API Routes
  router.use('/template', template({ config, mongoose }));
  router.use('/users', users({ config, mongoose }));



export default router;
