const routes = require('express').Router();
const bankLedger = require('../model/banking/bankLedger');
const BankRec = require('../model/banking/bankRec');
const bankRec = BankRec.bankRec;
const setClearedState = BankRec.setClearedState;
const getLastRecBal = BankRec.getLastRecBal;
const enterDeposit = require('../model/banking/enterDeposit');

routes.post('/trans/EnterDeposit', (req, res) => {
    const Deposit = new enterDeposit(req, res);
    Deposit.preprocess();
});
routes.post('/trans/bankLedger', bankLedger);
routes.post('/trans/bankRec', bankRec);
routes.get('/trans/getLastRecBal/:bankno', getLastRecBal);
routes.get('/trans/setClearedState/:transid/:checked', setClearedState)

module.exports = routes;
