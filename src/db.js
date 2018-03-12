
import { config } from './config'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUrl)

module.exports = { mongoose }
// import mongoose from 'mongoose';
//
// export default callback => {
//   let db = mongoose.connect('mongodb://localhost:27017/templateCollection');
//   callback(db);
// }
