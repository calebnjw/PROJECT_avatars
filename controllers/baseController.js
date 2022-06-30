const { Router } = require("express");

class BaseController {
  constructor(model) {
    this.model = model;
  };

  renderLogin = (request, response) => {
    response.render('login');
  };

  renderSignup = (request, response) => {
    response.render('signup');
  };

  renderCreator = (request, response) => {
    response.render('create');
  };

  renderProfile = (request, response) => {
    response.render('profile');
  }
};

module.exports = BaseController;