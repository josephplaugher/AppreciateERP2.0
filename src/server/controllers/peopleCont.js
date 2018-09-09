const routes = require('express').Router();
const customers = require('./../model/customers');
const allCust = customers.allCust;
const custById = customers.custById;

routes.get('/people/customers', allCust);
routes.get('/people/customers/:id', custById);

module.exports = routes;