const BaseController = require('./baseController');

class AvatarController extends BaseController {
  constructor(model, db) {
    super(model);
    this.User = db.User;
  };

  saveAvatar = async (request, response) => {
    const { userID } = request.cookies;
    const { avatarContents } = request.body;

    try {
      await this.model.create({
        userId: userID,
        avatarContents,
      });

      const { username } = await this.User.findOne({ where: { id: userID } });
      response.send({ username });
    } catch (error) {
      console.log(error);
      response.send({ error });
    }
  };
};

module.exports = AvatarController;