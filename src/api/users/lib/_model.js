/**
 * User model
 */
const crypto    = require('crypto');
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const BPromise  = require('bluebird');


var UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "default": ''
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
});

UserSchema.virtual('password')
.set(
  function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  }
)
.get(
  function() {
    return this._password;
  }
);

UserSchema.path('email').validate(
  function(email, fn) {
  var User;
  User = mongoose.model('User');
  if (this.isNew || this.isModified('email')) {
    User.find({
      email: email
    }).exec(function(err, users) {
      fn(err || users.length === 0);
    });
  } else {
    fn(true);
  }
}, 
'Email already exists'
);

UserSchema.path('hashed_password').validate(
  function(hashed_password) {
  return hashed_password.length;
}, 
'Password cannot be blank'
);

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
  encryptPassword: function(password) {
    var err;
    if (!password) {
      return '';
    }
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (_error) {
      err = _error;
      return '';
    }
  }
};

var User = mongoose.model('User', UserSchema);
BPromise.promisifyAll(User);
BPromise.promisifyAll(User.prototype);
