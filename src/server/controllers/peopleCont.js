const routes = require('express').Router();
const customers = require('./../model/customers');
const allCust = customers.allCust;
const custById = customers.custById;

routes.get('/customers', allCust);
routes.get('/customers/:id', custById);

module.exports = routes;