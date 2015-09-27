const _       = require('lodash');
const util    = require('util');
const core    = require('../../../core');
const models  = core.models;
const logger  = core.logger;

var Users = models.Users;

var createUser = function *createUser(next) {

  var user = Users.build({
    email: this.request.body.email,
    password: this.request.body.password
  });

  try {
    user = yield user.save();
  } catch(e) {
    debugger;
    if (e instanceof user.sequelize.ValidationError) { //if validation errors, show them to the user
      this.body = {
        errors: e.errors
      };
      this.response.status = 422;
      return;
    } else { //if other errors, throw them up
      throw e;
    }
  }

  //if no validation errors
  this.body = {
    data: {
      id: user.getDataValue('id'),
      email: user.getDataValue('email')
    }
  };
};

var destroyUser = function *destroyUser(next) {
  this.body = {
    error: 0,
    message: 'session destroyed'
  };
};

module.exports.handlers = {
  create: createUser,
  destroy: destroyUser
};
