const express = require('express');
const cookieParser = require('cookie-parser');
// const methodOverride = require('method-override');
// const bcrypt = require('bcrypt');

// import models
const db = require('./models/index.js');

// import controllers
const UserController = require('./controllers/userController.js');
const AvatarController = require('./controllers/avatarController.js');
// initialise controllers
const userController = new UserController(db.User, db);
const avatarController = new AvatarController(db.Avatar, db);

// import routers
const UserRouter = require('./routers/userRouter.js');
const AvatarRouter = require('./routers/avatarRouter.js');
// initialise routers
const userRouter = new UserRouter(userController).router();
const avatarRouter = new AvatarRouter(avatarController).router();

// express app
const app = express();

app.set('view engine', 'ejs');

// express middleware
app.use(cookieParser());
app.use(express.json());
// app.use(methodOverride('_method')); // not necessary since we use axios for post requests?
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// express routing through routers
app.use('/user', userRouter);

// checking if user is logged in
// if not, send to login page
app.use((request, response, next) => {
  request.userLoggedIn = false;

  if (request.cookies.loggedIn && request.cookies.userID) {
    request.userLoggedIn = true;
  };

  next();
});

app.get('/', (request, response) => response.redirect('/user/login'));
app.use('/user', userRouter);
app.use('/avatar', avatarRouter);

const PORT = 3004;
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
