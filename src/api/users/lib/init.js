/**
 * Author: Denis Zatsepin
 * Email: denis@zatsepin.spb.ru
 * Date: 05.09.13
 */

const mount     = require('koa-mount');
const config    = require('config');
const core      = require('../../../core');
const server    = core.server;
const models		= core.models;
const rester    = core.rester;
const logger    = core.logger;

module.exports = function() {
	logger.info("oct-user initialization...");
	var rest      = require('./rest');
	var router 		= rester(rest.handlers);
	server.use(mount('/users', router.middleware()));
};
