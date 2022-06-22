const { Router } = require("express");

export default class BaseController {
  constructor(model) {
    this.model = model;
  };

  testRoute(request, response) {
    response.send('This works.');
  };
};
