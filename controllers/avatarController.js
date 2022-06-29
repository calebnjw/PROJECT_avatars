const BaseController = require('./baseController');

class AvatarController extends BaseController {
  constructor(model, db) {
    super(model);
    this.User = db.User;
  };

  newAvatar = async (request, response) => {
    const { userID } = request.cookies;
    const { avatarContents } = request.body;

    try {
      console.log(userID);
      console.log(avatarContents);

      await this.model.create({
        userId: userID,
        avatarContents,
      });

      const { username } = await this.User.findOne({ where: { id: userID } });
      console.log(username);
      response.send({ username });
    } catch (error) {
      console.log(error);
      response.send({ error });
    }
  };

  getAvatars = async (request, response) => {
    // user profile is located at user/:username
    // get username from url parameters
    const { id } = request.params;
    // find all avatars associated with user id
    const avatars = await this.model.findAll({ where: { userId: id } });
    // send avatars to frontend
    response.send(avatars);
  }
};

module.exports = AvatarController;