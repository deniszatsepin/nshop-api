const co      = require('co');
const winston = require('winston');
const path		= require('path');
const config	= require('config');

config.apiPath = path.resolve(__dirname, 'api');

var core      = require('./core');

co(core.systemInit)
  .then(function(val) {
    winston.log('info', 'SYS INIT: ', val);
  }, function(err) {
    winston.log('error', 'SYS INIT ERROR:' , err);
  });
