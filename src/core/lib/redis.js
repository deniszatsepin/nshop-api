/**
*	Redis utils
*
* denis@zatsepin.spb.ru
*/

const redis   = require('redis');
const config  = require('config');
const logger  = require('winston');

exports.init = function () {
	var port = config.get('redis.port');
	var host = config.get('redis.host');
	logger.debug('Redis config: ' + host + ':', port);

	var client = redis.createClient(port, host);
	
	client.on('error', function (err) {
		logger.error('Redis error: ' + err);
  });
	
	module.exports.client = client;
};

