'use strict';

const http        = require('http');
const winston     = require('winston');

const config      = require('config');

const sequelize   = require('../models');
const redis       = require('./lib/redis');
const Server      = require('./lib/server');
const modules     = require('./lib/modules');

module.exports.systemInit = function* (initOnly) {
  var logFileName = config.get('log.filename') || 'log/default.log';
  var logger   = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: logFileName })
    ]
  });

  redis.init();

  var server = Server.setup();
  var port = config.get('server.port');

  exports.server = server;
  exports.logger = logger;
  exports.rester = require('./lib/rester');
  exports.models = sequelize;

  //initialize all modules
  modules.initModulesSync();

  Server.postInstall();

  if (!initOnly) {
    var srv = http.Server(server.callback());
    var io = require('socket.io')(srv);
    srv.listen(port, function() {
      logger.info('Octopus listening on port ' + port);
    });
  }
};
