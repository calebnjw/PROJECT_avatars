const express = require('express');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const pg = require('pg');

// import models
const db = require('./models/index.js');

// import controllers
const UserController = require('./controllers/userController.js');
const ItemController = require('./controllers/itemController.js');
// initialise controllers
const userController = new UserController(db.users);
const itemController = new ItemController(db.items);

// import routers
const UserRouter = require('./routers/userRouter');
const ItemRouter = require('./routers/itemRouter');
// initialise routers
const userRouter = new UserRouter(userController).router();
const itemRouter = new ItemRouter(itemController).router();

// express app
const app = express();
// express middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// express routing through routers
app.get('/', (request, response) => response.redirect('/bugs'))
app.use('/bugs', userRouter);
app.use('/features', itemRouter);

app.set('view engine', 'ejs');

const PORT = 3004;
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));