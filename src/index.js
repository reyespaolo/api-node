require('./config');
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes';
const passport = require('passport');

let app = express();

app.server = http.createServer(app);
app.use(passport.initialize());
require('./config/passport')(passport)


//middleware
//parse application/json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit: process.env.BODY_LIMIT}));

//api routes v1
app.use('/api/v1', routes);


app.server.listen(process.env.PORT);
console.log(`Server Started on ${app.server.address().port}`);

export default app;
