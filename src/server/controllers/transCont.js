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

routes.get('/coa', coa);
routes.post('/GL', GL);
routes.post('/newInvoice', newInvoice);
routes.post('/EnterDeposit', enterDeposit);
routes.post('/findBankTrans', findBankTrans);
routes.post('/FindInvoices', findInvoices);

module.exports = routes;
