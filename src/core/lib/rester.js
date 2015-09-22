/**
 * Author: Denis Zatsepin
 * Email: denis@zatsepin.spb.ru
 * Date: 05.09.13
 */

const Router  = require('koa-router');
const Body    = require('koa-body');

/**
 * This function gets handlers and base path and associate handlers with routes.
 * @param {String} path
 * @param {Array} handlers
 */
module.exports = function(handlers) {
	var path = '/';
	var router = new Router();
  for (var actionName in handlers) {
    var handler = handlers[actionName];
    var route = '';

    switch(actionName) {
      case 'index':
        router.get(path, handler);
        break;
      case 'new':
        route = path + 'new';
        router.get(route, handler);
        break;
      case 'create':
        router.post(path, Body(), handler);
        break;
      case 'show':
        route = path + ':id';
        router.get(route, handler);
        break;
      case 'edit':
        route = path + ':id/edit';
        router.get(rotue, handler);
        break;
      case 'update':
        route = path + ':id';
        router.put(route, Body(), handler);
        break;
      case 'destroy':
        route = path + ':id';
        router.delete(route, handler);
        break;
      default:
        router.get(route, Body(), handler);
    }
  }
	return router;
};
