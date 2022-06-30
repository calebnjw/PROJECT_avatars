const BaseController = require('./baseController');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { response, request } = require('express');
const e = require('express');

const saltRounds = 10;

class UserController extends BaseController {
  constructor(model, db) {
    super(model);
    this.Avatar = db.Avatar;
    this.AvatarLikes = db.AvatarLikes;
  };

  userLogin = async (request, response) => {
    try {
      const { username, password } = request.body;

      const user = await this.model.findOne({ where: { username } });

      // use bcrypt to compare hashed passwords
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          response.cookie('loggedIn', true);
          response.cookie('userID', user.id);

          response.send({ loggedIn: true });
        } else {
          response.send({ loggedIn: false });
        }
      });
    } catch (error) {
      console.log(error);
      response.send({ error });
    }
  };

  userSignup = async (request, response) => {
    const { username, password } = request.body;

    try {
      // use bcrypt to hash passwords
      bcrypt.hash(password, saltRounds, async (error, hash) => {
        const user = await this.model.create({
          username,
          password: hash,
        });

        if (user) {
          // tell frontend that signup was successful
          response.send({ signedUp: true });
        }
      });
    } catch (error) {
      console.log(error);
      response.send({ error });
    }
  };

  getUser = async (request, response) => {
    const { username } = request.params;
    const user = await this.model.findOne({ where: { username } });

    if (user) {
      response.send({ userId: user.id });
    } else {
      response.send({ message: 'No user found.' });
    }
  }

  getProfileData = async (request, response) => {
    try {
      const { username } = request.params;
      const user = await this.model.findOne({
        where: { username },
      });

      const avatars = await this.Avatar.findAll({
        where: {
          userId: user.id,
        }
      });

      const likes = [];
      await Promise.all(avatars.map(async (avatar) => {
        likes.push(await this.AvatarLikes.findAll({
          where: {
            avatarId: avatar.id,
          },
        }))
      }));

      // don't need user data, so don't send user data to frontend
      response.send({ avatars, likes });
    } catch (error) {
      console.log(error);
      response.send({ message: 'No user found.' });
    }
  }

  userLike = async (request, response) => {
    const { userID: userId } = request.cookies;
    const { like, avatarId } = request.body;

    try {
      if (like) {
        this.AvatarLikes.create({ userId, avatarId });
      } else {
        this.AvatarLikes.destroy({ where: { userId, avatarId } });
      }

      response.send(`done!`);
    } catch (error) {
      console.log(error);
    }

  }

  logout = (request, response) => {
    // delete login cookies on logout
    if (request.loggedIn) {
      response.clearCookie('loggedIn');
      response.clearCookie('userID');
    }

    // redirect to login page
    response.redirect('/user/login');
  };
}

module.exports = UserController;
