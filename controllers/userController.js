const BaseController = require('./baseController');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const saltRounds = 10;

class UserController extends BaseController {
  constructor(model) {
    super(model);
  };

  async getUser(request, response) {
    try {
      const { username, password } = request.body;

      const user = await this.model.findOne({ where: { username } });

      console.log(user);

      // use bcrypt to compare hashed passwords
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          console.log('Password match!');
          response.cookie('loggedIn', true);
          response.cookie('userID', user.id);

          response.send({ loggedIn: true });
        } else {
          response.send(false)
        }
      });
    } catch (error) {
      console.log(error);
      response.send({ error })
    }
  };

  async newUser(request, response) {
    try {
      const { username, password } = request.body;

      // use bcrypt to hash passwords
      bcrypt.hash(password, saltRounds, async (error, hash) => {
        console.log(hash);

        const user = await this.model.create({ username, password: hash });

        if (user) {
          // tell frontend that signup was successful
          response.send({ signedUp: true });
        }
      });
    } catch (error) {
      console.log(error);
      response.send({ error })
    }
  };

  logout(request, response) {
    // delete login cookies on logout
    if (request.loggedIn) {
      response.clearCookie('loggedIn');
      response.clearCookie('userID');
    }

    // redirect to login page
    response.redirect('/user/login');
  };
};

module.exports = UserController;