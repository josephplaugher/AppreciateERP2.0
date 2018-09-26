const routes = require('express').Router();
const coa = require('./../model/accounting/coa');
const GL = require('../model/accounting/gl');
const newInvoice = require('./../model/ar/NewInvoice');
const findBankTrans = require('./../model/banking/findBankTrans');
const deposits = require('./../model/banking/enterDeposit');
const enterDeposit = deposits.EnterDeposit;
const findInvoices = require('./../model/ar/findInvoices');

routes.get('/trans/coa', coa);
routes.post('/trans/gl', GL);
routes.post('/newInvoice', newInvoice);
routes.post('/trans/EnterDeposit', enterDeposit);
routes.post('/trans/findBankTrans', findBankTrans);
routes.post('/trans/FindInvoices', findInvoices);

module.exports = routes;
