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
    const { data } = request.body;
    const output = await this.model.findOne({ where: { username } });
    response.status(200).json(output);
  };

  async newUser(request, response) {
    const { data } = request.body;
    const output = await this.model.create({ ...data });
    response.status(200).json(output);
  };
};
