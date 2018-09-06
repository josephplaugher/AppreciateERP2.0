const routes = require('express').Router();
const user = require('./../model/users/login');
const newAccount = require('./../model/users/newUser');
const login = user.login;
const logout = user.logout;
const newUser = newAccount.newUser;
const addUser = newAccount.newUser;

routes.post('/login', login);
/*
routes.post('/logout', logout);
routes.post('/newUser', newUser);
routes.post('/addUser', addUser);
*/
module.exports = routes;
