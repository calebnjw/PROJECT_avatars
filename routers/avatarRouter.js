const express = require('express');
const router = express.Router();

export default class AvatarRouter {
  constructor(controller) {
    this.controller = controller
  };

  router() {
    // insert routes here
    router.post('/create', this.controller.newAvatar.bind(this.controller));

    return router;
  };
};
