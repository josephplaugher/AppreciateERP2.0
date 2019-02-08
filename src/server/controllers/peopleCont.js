const routes = require('express').Router();
const FindCustomers = require('../model/ar/findCustomers');
const editCustomer = require('../model/ar/editCustomer');
const FindSuppliers = require('../model/ap/findSuppliers');

routes.post('/people/findCustomers', (req, res) => {
    const Customers = new FindCustomers(req, res);
    Customers.Find();
});

routes.post('/people/editCustomer', editCustomer);

routes.post('/people/findSuppliers', (req, res) => {
    const Suppliers = new FindSuppliers(req, res);
    Suppliers.Find();
});

module.exports = routes;