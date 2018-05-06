console.log("ENVIRONMENT IS: ", process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
  case 'test':
  case 'testing':
  case 'local':
  case 'dev':
  case 'development':
  default:
    module.exports = require('./webpack.dev');
}