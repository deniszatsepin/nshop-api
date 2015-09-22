const _       = require('lodash');
const	path    = require('path');
const fs 			= require('fs');
const logger  = require('winston');

const	config  = require('config');

/**
 *  @param {String} path to modules dirs
 *  @exclude {Array} names of excluded modules
 */
var getSortedModules = exports.getSortedModules = function(root, exclude) {
	var excl = exclude || [];
	var modules = [];

	if (fs.existsSync(root)) {
		var mDirs = fs.readdirSync(root);
		_.each(mDirs, function(mDir) {
			if (excl.indexOf(mDir) !== -1) return;

			var modulePath = path.normalize(root + '/' + mDir);
			var packagePath = path.normalize(modulePath + '/package.json');
			var initPath = modulePath + '/lib/init.js';
			logger.info('Find module: ' + mDir);
			logger.info('Module path: ' + modulePath);
			var priority = null;
			if (fs.existsSync(packagePath)) {
				priority = require(packagePath).priority;
			}
			if (fs.existsSync(initPath)) {
				modules.push({
					name: mDir,
					init: modulePath + '/lib/init',
					priority: parseInt(priority, 10) || 1000
				});
			}
		});
	}

	return modules.sort( function(a, b) {
		var ap = a.priority;
		var bp = b.priority;
		return ap === bp ? 0 : ap > bp ? 1 : -1;
	});

};

function initModules(modules) {
	_.each(modules, function(module) {
		var moduleInit = require(module.init);
		if (typeof moduleInit === 'function') {
			moduleInit();
		}
	});
}

module.exports.initModulesSync = function() {
	var root = config.get('apiPath');
	var excludeModules = config.get('modules.exclude') || [];

	var modules = getSortedModules(root, excludeModules);
	initModules(modules);
};
