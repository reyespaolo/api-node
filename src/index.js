require('./config');
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import routes from './routes';

let app = express();

app.server = http.createServer(app);

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
  res.render("home")
})

//middleware
//parse application/json
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT
}));

//api routes v1
app.use('/v1', routes);

app.server.listen(process.env.PORT);
console.log(`Server Started on ${app.server.address().port}`);

export default app;
