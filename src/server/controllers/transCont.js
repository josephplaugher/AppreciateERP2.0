const routes = require('express').Router();
const coa = require('./../model/accounting/coa');
const getCOA = coa.get;
const editCOA = coa.edit;
const disableAcct = coa.disable;
const enableAcct = coa.enable;
const deleteAcct = coa.deleteAcct;
const newAcct = require('./../model/accounting/newAcct');
const GL = require('./../model/accounting/gl');
const JournalEntry = require('./../model/accounting/JournalEntry');
const newInvoice = require('./../model/ar/NewInvoice');
const findInvoices = require('./../model/ar/findInvoices');
const findAPInvoices = require('./../model/ap/findAPInvoices');
const bankLedger = require('../model/banking/bankLedger');
const enterDeposit = require('./../model/banking/enterDeposit');

//General Ledger, Chart of Accounts, Journal Entries
routes.get('/trans/coa', getCOA);
routes.get('/trans/disableAcct/:acctno', disableAcct)
routes.get('/trans/enableAcct/:acctno', enableAcct)
routes.get('/trans/deleteAcct/:acctno', deleteAcct)
routes.post('/trans/editCOA', editCOA)
routes.post('/trans/newAcct',(req, res) => {
    const NewAcct = new newAcct(req, res);
    NewAcct.start();
})
routes.post('/trans/gl', GL);

routes.post('/trans/je', (req, res) => {
    const JE = new JournalEntry(req,res);
    JE.preProcess();
});

//Accounts Receivable
routes.post('/trans/newInvoice', (req, res) => {
    const Invoice = new newInvoice(req,res);
    Invoice.enterNewInvoice();
});

routes.post('/trans/EnterDeposit', (req, res) => {
    const Deposit = new enterDeposit(req, res);
    Deposit.preprocess();
});

routes.post('/trans/FindInvoices', findInvoices);

//Accounts Payable
routes.post('/trans/FindAPInvoices', findAPInvoices);

//Banking

routes.post('/trans/bankLedger', bankLedger);

module.exports = routes;
