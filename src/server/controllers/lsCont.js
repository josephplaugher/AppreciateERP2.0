const routes = require('express').Router();
const liveSearch = require('./../util/liveSearch');
const autoFill = require('./../util/autoFill');
const search = liveSearch.search;
const fill = autoFill.fill;

routes.get('/LiveSearch/:name.:value', search);
routes.get('/LiveSearch/autofill/:name/:value', fill);

module.exports = routes;