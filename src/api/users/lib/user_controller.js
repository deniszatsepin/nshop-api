/**
 * Created by Denis Zatsepin <denis@zatsepin.spb.ru>.
 */
const core    = require('../../../core');

const models  = core.models;
var UsersModel = models.Users;

class User {

  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  *initialize() {
    try{
      var model = yield UsersModel.findOne({
        where: {
          email: this.email
        }
      });
      if (model.authenticate(this.password)) {
        this.model = model;
      } else {
        throw new Error('Password didn\'t match');
      }
    } catch (e) {
      throw e;
    }
  }

  static *create(email, password) {
    // TODO: we need to notify system about user creation, to send email to the user,
    //and maybe for other things
    var model = UsersModel.build({
      email: email,
      password: password
    });

    user = yield user.save();
    this.model = model;
  }


  *changePassword(oldPassword, newPassword) {
    var model = this.model;
    if (model.authenticate(oldPassword)) {
      try {
        yield model.update({
          password: newPassword
        });
      } catch (e) {

      }
    }
  }

  *passwordRecovery(email) {

  }

  /*
  * Delete user from data store
  */
  *destroy() {

  }
}