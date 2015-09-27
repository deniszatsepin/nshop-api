/**
 * Created by Denis Zatsepin <denis@zatsepin.spb.ru>.
 */

'use strict';
const crypto    = require('crypto');

exports.makeSalt = function() {
  return Math.round(new Date().valueOf() * Math.random()) + '';
};

exports.encryptPassword = function(password, salt) {
  var err;
  if (!password) {
    return '';
  }
  try {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
  } catch (_error) {
    err = _error;
    return '';
  }
};
