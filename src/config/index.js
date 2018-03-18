var env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'production'){
  var configuration = require('./config.json');
  var envConfig = configuration[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
