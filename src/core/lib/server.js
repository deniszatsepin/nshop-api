const koa           = require('koa');
const onerror       = require('koa-onerror');
const config        = require('config');
const Router        = require('koa-router');
const Validate      = require('koa-validate');
var app = null;

module.exports.setup = function() {
  app = koa();
	onerror(app);

	app.use(Validate());
	app.use(Router().routes());

  return app;
};

module.exports.postInstall = function () {
};
