import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDB from '../db';
import template from '../controller/template'
let router = express();

//Connect to DB
initializeDB(db => {
  //internal middleware
  router.use(middleware({ config, db }));

  // API Routes
  router.use('/template', template({ config, db }));

})

export default router;
