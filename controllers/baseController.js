const { Router } = require("express");

class BaseController {
  constructor(model) {
    this.model = model;
  };

  testRoute(request, response) {
    response.send('This works.');
  };
};

module.exports = BaseController;