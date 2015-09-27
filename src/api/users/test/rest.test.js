const _         = require('lodash');
const co        = require('co');
const path      = require('path');
const expect    = require('chai').expect;
const coMocha   = require('co-mocha');
const supertest = require('co-supertest');

const core      = require('../../../core');
const models    = require('../../../models');

var config      = require('config');
config.apiPath = path.resolve(__dirname, '../../');

describe('/users', function() {


  describe('Create user', function () {
    var request = null;
    var simplePassword = '12345678';

    before(function(done) {
      //models.sequelize.sync({force: true}).then(function() {
        co(core.systemInit(true))
          .then(function() {
            request = supertest.agent(core.server.listen());
            done();
          }, function(err) {
            done(err);
          });
      //});
    });

    it('should require user email and password', function *() {
      var res = yield request
        .post('/users')
        .expect(422)
        .end();
      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].path).to.equal('email');
      expect(res.body.errors[1].path).to.equal('password');
    });

    it('should require password', function *() {
      var data = {
        email: 'my@email.com'
      };
      var res = yield request
        .post('/users')
        .send(data)
        .expect(422)
        .end();

      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].path).to.equal('password');
    });

    it('should require email', function *() {
      var data = {
        password: simplePassword
      };
      var res = yield request
        .post('/users')
        .send(data)
        .expect(422)
        .end();

      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].path).to.equal('email');
    });

    it('should require correct email', function *() {
      var data = {
        email: 'myemailcom',
        password: simplePassword
      };

      var res = yield request
        .post('/users')
        .send(data)
        .expect(422)
        .end();

      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].path).to.equal('email');
    });

    it('should require password length greater then 7', function *() {
      var data = {
        email: 'my@email.com',
        password: '1234567'
      };

      var res = yield request
        .post('/users')
        .send(data)
        .expect(422)
        .end();

      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].path).to.equal('password');
    });

    it('should require password length less then 100', function *() {
      var data = {
        email: 'my@email.com',
        password: _.range(101).join('')
      };

      var res = yield request
        .post('/users')
        .send(data)
        .expect(422)
        .end();

      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].path).to.equal('password');
    });

    it('should create user', function *() {
      var data = {
        email: 'my@email.com',
        password: simplePassword
      };

      var res = yield request
        .post('/users')
        .send(data)
        .expect(200)
        .end();

      expect(res.body.data.id).to.exist;
      expect(res.body.data.email).to.exist;
    });

    it('shouldn\'t create user with the same email', function *() {
      var data = {
        email: 'my@email.com',
        password: simplePassword
      };

      var res = yield request
        .post('/users')
        .send(data)
        .expect(422)
        .end();

      expect(res.body.errors).to.exist;
      expect(res.body.errors[0].path).to.equal('email');
    });
  });

  describe('Get user', function() {});
  describe('Update user', function() {});
  describe('Delete user', function() {});
});
