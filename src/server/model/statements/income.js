const db = require('../../util/postgres');
const Conn = db.userConn;

const Income = (req, res) => {
    const inputs = req.body;
    const query = {
        "text": `
            SELECT 
                sys_gl.acctname, sys_gl.acctno, sys_coa.type, SUM(debit) AS debitbal, SUM(credit) AS creditbal
            FROM sys_gl, sys_coa 
            WHERE sys_coa.acctname = sys_gl.acctname AND ledgerdate BETWEEN $1 AND $2
            GROUP BY (sys_gl.acctname, sys_gl.acctno, sys_coa.type) 
            ORDER BY acctname ASC`,
        "values": [inputs.startdate, inputs.enddate]
    }
    Conn.query(query)
        .then(data => {
            var revenue = [];
            var expense = []
            let i;
            // this loop adds all the income and expense result sets to their respective arrays for the server response
            for(i = 0; i < data.rows.length; i++) {
                if(data.rows[i].type === 'Income') {
                    revenue.push(data.rows[i])
                }
                if(data.rows[i].type === 'Expense') {
                    expense.push(data.rows[i])
                }
            }
            res.status(200).json({
                statementData: {revenue: revenue, expense, expense},
                success: true
            })
        })
        .catch(error => {
            console.log('income query error: ', error)
            res.status(200).json({ userNotify: {error: 'something went wrong, please try again'}});
        })
}

module.exports = Income;