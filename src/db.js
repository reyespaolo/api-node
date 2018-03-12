
import { config } from './config'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUrl)

module.exports = { mongoose }
