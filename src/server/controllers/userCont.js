const routes = require('express').Router()
const jwt = require('jsonwebtoken')
const user = require('./../model/users/login')
const newAccount = require('./../model/users/newUser')
const login = user.login
const newUser = newAccount.newUser
const addUser = newAccount.newUser

//routes.post('/users/login', login);
// routes.post('/user/newUser', newUser);
// routes.post('/user/addUser', addUser);
// */
module.exports = routes
