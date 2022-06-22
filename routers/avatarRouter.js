const express = require('express');
const router = express.Router();

export default class AvatarRouter {
  constructor(controller) {
    this.controller = controller
  };

  router() {
    // insert routes here
    router.get('/', (request, response) => {
      response.redirect('/create');
    })
    router.get('/create', (request, response) => {
      response.render(create);
    })

    router.post('/create', this.controller.newAvatar.bind(this.controller));

    return router;
  };
};
