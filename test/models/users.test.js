/**
 * Created by Denis Zatsepin <denis@zatsepin.spb.ru>.
 */

const co = require('co');
const expect = require('chai').expect;
const models = require('../../src/models');
const Users = models.Users;

describe('models/users', function() {

  describe('create user', function() {
    var user;
    var userData = {
      email: 'denis@mail.com',
      password: '12345'
    };

    beforeEach(function() {
      user = Users.build(userData);
    });

    it('should create user', function() {
      expect(user).not.to.be.empty;
      expect(user.getDataValue('email')).to.equal(userData.email);
      expect(user.getDataValue('password_hash')).not.to.be.empty;
    });

    it('should authenticate by password', function() {
      expect(user.authenticate(userData.password)).to.be.true;
    });

  });
});
