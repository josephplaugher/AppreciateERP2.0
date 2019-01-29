const routes = require('express').Router();
const Income = require('../model/statements/income');
const Balance = require('../model/statements/balance');
const Cash = require('../model/statements/cash');

routes.post('/stmts/income', Income);

routes.post('/stmts/balance', (req, res) => {
    const BalanceSheet = new Balance(req, res);
    BalanceSheet.Run()
});

routes.post('/stmts/cash', (req, res) => {
    const CashFlows = new Cash(req, res);
    CashFlows.Run()
});

module.exports = routes;