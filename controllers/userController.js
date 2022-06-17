const BaseController = require('./baseController');

class UserController extends BaseController {
  constructor(model) {
    super(model);
  };

  userRoute(request, response) {
    response.send('User route.');
  };

  testRoute(request, response) {
    response.send('This test is in user route.');
  };

  async insertOne(request, response) {
    const { data } = request.body;
    const output = await this.model.create({ ...data });
    response.status(200).json(output);
  };
};

module.exports = UserController;