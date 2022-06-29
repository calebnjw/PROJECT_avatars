const { Router } = require("express");

class BaseController {
  constructor(model) {
    this.model = model;
  };

  getLogin = (request, response) => {
    response.render('login');
  };

  getSignup = (request, response) => {
    response.render('signup');
  };

  getCreator = (request, response) => {
    response.render('create');
  };

  getProfile = (request, response) => {
    const { username } = request.params
    response.render('profile', { username });
  }
};

module.exports = BaseController;