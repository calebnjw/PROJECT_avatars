const express = require('express');

const router = express.Router();

class UserRouter {
  constructor(controller) {
    this.controller = controller
  }

  router() {
    // insert routes here
    // have to .bind(this.controller) at the end of each route
    router.get('/login', this.controller.getLogin.bind(this.controller));
    router.get('/signup', this.controller.getSignup.bind(this.controller));
    router.get('/:username', this.controller.getProfile.bind(this.controller));

    router.post('/login', this.controller.userLogin.bind(this.controller));
    router.post('/signup', this.controller.userSignup.bind(this.controller));

    router.get('/logout', this.controller.logout);

    return router;
  }
}

module.exports = UserRouter;
