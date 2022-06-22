const BaseController = require('./baseController');
const bcrypt = require('bcrypt');

export default class UserController extends BaseController {
  constructor(model) {
    super(model);
  };

  getLogin(request, response) {
    response.render('login');
  };

  getSignup(request, response) {
    response.render('signup');
  };

  async getUser(request, response) {
    const { username, password } = request.body;

    const user = await this.model.findOne({ where: { username } });

    // bcrypt has password here

    // then compare hashed passwords
    if (user.password === password) {
      console.log('User match');
      response.cookie('loggedIn', true);
      response.cookie('userID', user.id);

      response.send({ loggedIn: true });
    }
  };

  async newUser(request, response) {
    try {
      const { username, password } = request.body;
      const user = await this.model.create({ ...data });

      if (user) {
        response.send({ signedUp: true });
      }
    } catch (error) {
      console.log(error);
      response.send({ error })
    }
  };
};
