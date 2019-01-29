const BaseStatement = require('../../util/BaseStatement');
const db = require('../../util/postgres');
const Conn = db.userConn;

function Income(req, res) {
    BaseStatement.apply(this, arguments);
    this.inputs = req.body;
    this.res = res;
    this.revAccts = [];
    this.expAccts = [];
    this.revenue = {};
    this.expenses = {};
    this.profit = {};
    this.prepare = `
        SELECT 
            acctname, acctno SUM(debit) AS debitbal, SUM(credit) AS creditbal
        FROM sys_gl 
        WHERE ledgerdate BETWEEN $1 AND $2
        GROUP BY (acctname, acctno)`;
}

Income.prototype = BaseStatement.prototype;
Income.prototype.constructor = BaseStatement;

Income.prototype.Run = function() {
    // first get the account list and related data
    Conn.query('SELECT acctname, acctno, type FROM sys_coa ORDER BY acctno ASC')
      .then(data => {
          for(i = 0; i < data.rows.length; i++) {
            // place all income accounts in the revacct property
            if(data.rows[i].type === 'Income') {
                //console.log('push rev: ', data.rows[i])
                this.revAccts.push(data.rows[i])
            }
            // place all expense accounts in the revacct property
            if(data.rows[i].type === 'Expense') {
                this.expAccts.push(data.rows[i])
            }
          }
          this.getRevenue();
      })
      .catch(error => {
          console.log('last error: ', error)
      })
}

Income.prototype.getRevenue = function() {
    const inputs = this.inputs;
    var i = 0;
    for(i = 0; i < this.revAccts.length; i++) {
        var acctname = this.revAccts[i].acctname;
        const query = {
            "text": this.prepare,
            "values":[inputs.startdate, inputs.enddate, acctname]
        }
        Conn.query(query)
            .then(data => {
                if(typeof data.rows[0] !== 'undefined') {
                    var row = data.rows[0];
                    console.log('the row: ', row)
                    var bal = row.creditbal - row.debitbal;
                    var revenue = Object.assign({}, this.revenue)
                    revenue[row.acctname] = bal;
                    console.log('rev assign: ', revenue)
                    this.revenue = revenue;
                }
                
            })
            .catch(error => {
                console.log('Query error: ', error)
            })
        this.getExpenses();
    }
}

Income.prototype.getExpenses = function() {
    const inputs = this.inputs;
    var i = 0;
    for(i = 0; i < this.expAccts.length; i++) {
        var acctname = this.expAccts[i].acctname
        const query = {
            "text": this.prepare,
            "values":[inputs.startdate, inputs.enddate, acctname]
        }
        Conn.query(query)
            .then(data => {
                if(typeof data.rows[0] !== 'undefined') {
                    var row = data.rows[0];
                    var bal = row.debitbal - row.creditbal;
                    var expenses = Object.assign({}, this.expenses)
                    expenses[row.acctname] = bal;
                    this.expenses = expenses;
                }
                console.log('expenses: ', this.expenses)
                
            })
            .catch(error => {
                console.log('Query error: ', error)
            })   
        this.calcProfit();
    }
}

Income.prototype.calcProfit = function() {
    var totalRevenue = 0;
    var totalExpense = 0;
    var totalProfit = 0;
    for(creditbal in this.revenue) {
        console.log('profit val: ', this.revenue[creditbal])
        totalRevenue += this.revenue[creditbal];
    }
    for(debitbal in this.expenses) {
        console.log('expense val: ', this.expenses[debitbal])
        totalExpense += this.expenses[debitbal];
    }
    totalProfit = parseFloat(totalRevenue) - parseFloat(totalExpense);
    
    this.res.status(200).json({
        statementData: {
            revenue: this.revenue, 
            totalRevenue: parseFloat(totalRevenue).toFixed(2),
            expenses: this.expenses, 
            totalExpenses: parseFloat(totalExpense).toFixed(2),
            profit: parseFloat(totalProfit).toFixed(2)
        }
    })
}

module.exports = Income;