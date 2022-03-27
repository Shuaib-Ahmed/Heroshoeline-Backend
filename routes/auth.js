const express = require("express");
const Routes = express.Router();

const {createUser, checkUser} = require("../controllers/auth")

Routes.route('/signup').post(createUser);
Routes.route('/login').post(checkUser);

module.exports = Routes;