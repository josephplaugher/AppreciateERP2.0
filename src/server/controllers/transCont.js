const routes = require('express').Router();
const coa = require('./../model/coa');
const gl = require('./../model/gl');
const newInvoice = require('./../model/NewInvoice');
const glHTML = gl.glHTML;
const glJSON = gl.glJSON;
const findBankTrans = require('./../model/banking/findBankTrans');
const deposits = require('./../model/banking/enterDeposit');
const enterDeposit = deposits.EnterDeposit;
const findInvoices = require('./../model/ar/findInvoices');

routes.get('/trans/coa', coa);
routes.post('/trans/GL', GL);
routes.post('/newInvoice', newInvoice);
routes.post('/trans/EnterDeposit', enterDeposit);
routes.post('/trans/findBankTrans', findBankTrans);
routes.post('/trans/FindInvoices', findInvoices);

module.exports = routes;
