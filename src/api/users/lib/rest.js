const _       = require('lodash');
const util    = require('util');
const core    = require('../../../core');
const logger  = core.logger;
const User    = require('./user_controller');


function *createUser(next) {
  let body = this.request.body;
  let user;

  try {
    user = yield User.create(body.username, body.password);
  } catch(e) {
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
}

function *updateUser(next) {
  var user = this.user;
  //validate old password
  //set new password
}

function *destroyUser(next) {
  this.body = {
    error: 0,
    message: 'session destroyed'
  };
}

module.exports.handlers = {
  create: createUser,
  update: updateUser,
  destroy: destroyUser
};
