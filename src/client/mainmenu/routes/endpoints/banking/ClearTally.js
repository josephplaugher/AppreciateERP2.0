const ClearTally = (table) => {
    // table.shift() // remove the header object from the array
    let clearedList = {};
    let deposits = []
    let withdrawals = []
    var clearedDepositsTotal = 0
    var clearedWithdrawalsTotal = 0
    // build the cleared list to be placed into state and to send
    // to the server to be cleared
    var i;
    for(i=0; i<table.length; i++) {
      if(table[i].clr === 'clr') {
        clearedList['transid'] = table[i].transid
        clearedList['debit'] = table[i].debit
        clearedList['credit'] = table[i].credit
      }
    // build a deposits array for getting a total
      if(table[i].debit !== null) {
        deposits.push(table[i].debit)
        clearedDepositsTotal += parseFloat(table[i].debit)
      }
    // build a withdrawals array for getting a total
      if(table[i].credit !== null) {
        withdrawals.push(table[i].credit)
        clearedWithdrawalsTotal += parseFloat(table[i].credit)
      }
    }
    var clearedTotal = clearedDepositsTotal - clearedWithdrawalsTotal
    
    var returnObj = {
        'clearedDepositsTotal': clearedDepositsTotal,
        'clearedWithdrawalsTotal': clearedWithdrawalsTotal,
        'clearedTotal': clearedTotal,
        'clearedList': clearedList
        }
    return returnObj
}

const UpdateClearTally = (clearedList,clearedBal, clearedDeposits, clearedWithdrawals, rowData) => {
    var newClearedList = Object.assign({}, clearedList)
    
}

export {ClearTally, UpdateClearTally}