const co  = require('co');
const core    = require('oct-core');
const expect  = require('chai').expect;

describe('/users', function() {


  describe('Create user', function () {
    var request = null;

    before(function(done) {
      co(core.systemInit(true))
        .then(function() {
          request = require('co-supertest').agent(core.server.listen());
          done();
        });
    });

    it('should require user email and password', function *() {
      var res = yield request
        .post('/users')
        .expect(401)
        .end();
      console.log('res: ', res);
      expect(res.body.errors).to.exist();
      expect(res.body.errors[0].email).to.exist();
      expect(res.body.errors[1].password).to.exist();
    });

    it('should require password', function *() {
      var data = {
        email: 'my@email.com'
      };
      var res = yield request
        .post('/users')
        .send(data)
        .expect(401)
        .end();

      expect(res.body.errors).to.exist();
      expect(res.body.errors[0].password).to.exist();
    });

    it('should require email', function *() {
      var data = {
        password: '12345'
      };
      var res = yield request
        .post('/users')
        .send(data)
        .expect(401)
        .end();

      expect(res.body.errors).to.exist();
      expect(res.body.errors[0].email).to.exist();
    });

    it('should require correct email', function *() {
      var data = {
        email: 'myemailcom',
        password: '12345'
      };

      var res = yield request
        .post('/users')
        .send(data)
        .expect(401)
        .end();

      expect(res.body.errors).to.exist();
      expect(res.body.errors[0].email).to.exist();
    });

    it('should require password length greate then 2', function *() {
      var data = {
        email: 'my@email.com',
        password: '12'
      };

      var res = yield request
        .post('/users')
        .send(data)
        .expect(401)
        .end();

      expect(res.body.errors).to.exist();
      expect(res.body.errors[0].password).to.exist();
    });

    it('should require password length less then 21', function *() {
      var data = {
        email: 'my@email.com',
        password: '123456789012345678901'
      };

      var res = yield request
        .post('/users')
        .send(data)
        .expect(401)
        .end();

      expect(res.body.errors).to.exist();
      expect(res.body.errors[0].password).to.exist();
    });

    it('should create user', function *() {
      var data = {
        email: 'my@email.com',
        password: '12345678'
      };

      var res = yield request
        .post('/users')
        .send(data)
        .expect(200)
        .end();

      expect(res.body.data._id).to.exist();
      expect(res.body.data.email).to.exist();
    });

    it('shouldn\'t create user with the same email', function *() {
      var data = {
        email: 'my@email.com',
        password: '12345678'
      };

      var res = yield request
        .post('/users')
        .send(data)
        .expect(200)
        .end();

      expect(res.body.errors).to.exist();
      expect(res.body.errors[0].email).to.exist();
    });
  });

  describe('Get user', function() {});
  describe('Update user', function() {});
  describe('Delete user', function() {});
});
