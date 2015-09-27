/**
 * Created by Denis Zatsepin <denis@zatsepin.spb.ru>.
 */
const expect = require('chai').expect;
const authenticate = require('../../src/utils/authenticate.js');

describe('utils/authenticate.js', function() {

  it('should make a salt', function() {
    var salt = authenticate.makeSalt();
    expect(salt).not.to.be.empty;
  });

  it('should make a unique salt', function() {
    var salt1 = authenticate.makeSalt();
    var salt2 = authenticate.makeSalt();
    expect(salt1).not.to.equal(salt2);
  });

  it('should encrypt string', function() {
    var salt = authenticate.makeSalt();
    var str = 'password';
    var enc1 = authenticate.encryptPassword(str, salt);
    var enc2 = authenticate.encryptPassword(str, salt);

    expect(enc1.length).to.be.equal(40);
    expect(enc2.length).to.be.equal(40);
    expect(enc1).to.equal(enc2);
  });

  it('should encrypt string', function() {
    var salt1 = authenticate.makeSalt();
    var salt2 = authenticate.makeSalt();
    var str = 'password';
    var enc1 = authenticate.encryptPassword(str, salt1);
    var enc2 = authenticate.encryptPassword(str, salt2);

    expect(enc1.length).to.be.equal(40);
    expect(enc2.length).to.be.equal(40);
    expect(enc1).not.to.equal(enc2);
  });

});