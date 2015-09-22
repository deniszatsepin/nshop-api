const _         = require('lodash');
const util      = require('util');
const core    = require('../../../core');
const models    = core.models;
const logger    = core.logger;

var Users = models.Users;

var createUser = function *createUser(next) {

  this.checkBody('email').notEmpty('Email field is required').isEmail('You enter a bad email.');
  this.checkBody('password').notEmpty('Email field is required').len(3,20);

  if (this.errors) {
    this.body = {
      errors: this.errors
    };
    this.response.status = 401;
    return;
  }

  var user = new User({
    email: this.request.body.email,
    password: this.request.body.password
  });

  try {
    user = yield user.saveAsync();
  } catch(e) {
    if (e.name === 'ValidationError') { //if validation errors, show them to the user
      this.body = {
        errors: _.map(e.errors, function(val, key) {
          var err = {};
          err[key] = val.message;
          return err;
        })
      };
      return;
    } else { //if other errors, throw them up
      throw e;
    }
  }

  this.body = {
    data: {
      _id: user[0]._id,
      email: user[0].email
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
