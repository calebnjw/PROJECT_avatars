const BaseController = require('./baseController');

class AvatarController extends BaseController {
  constructor(model, db) {
    super(model);
    this.Background = db.AvatarBackground;
    this.Base = db.AvatarBase;
    this.Face = db.AvatarFace;
  };

  async newAvatar(request, response) {
    const userId = 1;
    const { avatarName } = request.body;
    const { a, b, c } = request.query;

    const avatar = await this.model.create({
      userId: userId,
      name: avatarName,
      avatarContents: [{ "0-0": [a, 0] }, { "0-0": [b, 1] }, { "0-0": [c, 2] }],
    });

    response.status(200).json(avatar);
  }

  async getAllAvatars(request, response) {
    const { userID } = request.cookies;
  }

  async getOneAvatar(request, response) {
    const { userID } = request.cookies;
  }
};

module.exports = AvatarController;