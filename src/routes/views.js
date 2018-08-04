import express from 'express';
import middleware from '../middleware';
import mongoose from '../db';
import template from '../controller/template'
import users from '../controller/user'

let router = express();



  router.use('/login', (req,res) => {
    res.render("login")
  })

  router.use('/', (req,res) => {
    res.render("home")
  })



export default router;
