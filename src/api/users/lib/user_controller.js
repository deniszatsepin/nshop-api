/**
 * Created by Denis Zatsepin <denis@zatsepin.spb.ru>.
 */
const core    = require('../../../core');

const models  = core.models;
var UsersModel = models.Users;

class User {

  *controller(email, password) {
    try{
      var model = yield UsersModel.findOne({
        where: {
          email: email
        }
      });
      if (model.authenticate(password)) {
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
    var user = UsersModel.build({
      email: email,
      password: password
    });

    try {
      user = yield user.save();
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