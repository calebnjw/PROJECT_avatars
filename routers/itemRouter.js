const express = require('express');
const router = express.Router();

class ItemRouter {
  constructor(controller) {
    this.controller = controller
  }
  router() {
    // insert routes here
    return router;
  }
}

module.exports = ItemRouter;