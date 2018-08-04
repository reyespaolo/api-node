require('./config');
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// const passportSetup = require('./config/passport-setup')
import routes from './routes/v1';
// import auth from './routes/auth';
//
// import views from './routes/views';


let app = express();

app.server = http.createServer(app);

// app.set('view engine', 'ejs');


//middleware
//parse application/json
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT
}));

//api routes v1
app.use('/v1', routes);
// app.use('/auth', auth);
// app.use('/', views);

app.server.listen(process.env.PORT);
console.log(`Server Started on ${app.server.address().port}`);

export default app;
