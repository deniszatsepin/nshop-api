const mount   = require('koa-mount');
const core    = require('oct-core');
const server  = core.server;
const rester  = core.rester;
const logger  = core.logger;

require('./model');
const middleware  = require('./middleware');

logger.info('oct-profiles initialization...');

module.exports = function() {
  "use strict";
  //server.use(middleware());
};

