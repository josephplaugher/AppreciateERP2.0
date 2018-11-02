const routes = require('express').Router();
const coa = require('./../model/accounting/coa');
const GL = require('./../model/accounting/gl');
const JournalEntry = require('./../model/accounting/JournalEntry');
const newInvoice = require('./../model/ar/NewInvoice');
const findBankTrans = require('./../model/banking/findBankTrans');
const enterDeposit = require('./../model/banking/enterDeposit');
const findInvoices = require('./../model/ar/findInvoices');

routes.get('/trans/coa', coa);
routes.post('/trans/gl', GL);
routes.post('/trans/newInvoice', (req, res) => {
    const Invoice = new newInvoice(req,res);
    Invoice.enterNewInvoice();
});
routes.post('/trans/je', (req, res) => {
    const JE = new JournalEntry(req,res);
    JE.preProcess();
});
routes.post('/trans/EnterDeposit', (req, res) => {
    const Deposit = new enterDeposit(req, res);
    Deposit.preprocess();
});
routes.post('/trans/findBankTrans', findBankTrans);
routes.post('/trans/FindInvoices', findInvoices);

module.exports = routes;
