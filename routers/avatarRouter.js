const express = require('express');
const router = express.Router();

class AvatarRouter {
  constructor(controller) {
    this.controller = controller;
  }

  router() {
    // insert routes here
    router.get('/', (request, response) => response.redirect('/create'));
    router.get('/create', this.controller.renderCreator.bind(this.controller));

    // router.get('/:username', this.controller.getAvatars.bind(this.controller));

    router.post('/save', this.controller.saveAvatar.bind(this.controller));

    return router;
  }
}

module.exports = AvatarRouter;
