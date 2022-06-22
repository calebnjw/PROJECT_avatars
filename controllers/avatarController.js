const BaseController = require('./baseController');

export default class AvatarController extends BaseController {
  constructor(model, db) {
    super(model);
    this.Background = db.AvatarBackground;
    this.Base = db.AvatarBase;
    this.Face = db.AvatarFace;
  };

  async newAvatar(request, response) {
    const userId = 1;
    const { avatarName } = request.body;
    const { a: backgroundId, b: baseId, c: faceId } = request.query;

    const avatar = await this.model.create({
      userId: userId,
      name: avatarName,
      backgroundId: backgroundId,
      baseId: baseId,
      faceId: faceId,
    });

    response.status(200).json(avatar);
  }
};
