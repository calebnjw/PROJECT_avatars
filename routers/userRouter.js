const express = require('express');
const router = express.Router();

class UserRouter {
  constructor(controller) {
    this.controller = controller
  };

  router() {
    // insert routes here
    // have to .bind(this.controller) at the end of each route
    router.get('/test', this.controller.testRoute.bind(this.controller));
    router.get('/utest', this.controller.userRoute.bind(this.controller));
    router.post('/add-user', this.controller.insertOne.bind(this.controller));

    return router;
  };
};

module.exports = UserRouter;