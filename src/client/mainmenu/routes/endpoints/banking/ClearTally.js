const ClearTally = (table) => {
    // table.shift() // remove the header object from the array
    let clearedList = {transids:[],debits:[],credits:[]};
    let deposits = []
    let withdrawals = []
    var clearedDepositsTotal = 0
    var clearedWithdrawalsTotal = 0
    // build the cleared list to be placed into state and to send
    // to the server to be cleared
    var i;
    for(i=0; i<table.length; i++) {
        if(table[i].clr === 'true') {
            clearedList['debits'].push(parseFloat(table[i].debit))
            clearedList['credits'].push(parseFloat(table[i].credit))
            clearedList['transids'].push(table[i].transid)
            
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
    }
    var clearedTotal = clearedDepositsTotal - clearedWithdrawalsTotal
  
    var returnObj = {
        'clearedDepositsTotal': clearedDepositsTotal,
        'clearedWithdrawalsTotal': clearedWithdrawalsTotal,
        'clearedTotal': clearedTotal,
        'clearedList': clearedList
        }
        console.log('cleared data: ', returnObj)
    
    return returnObj
}

const UpdateClearTally = (clearedList,clearedBal,clearedDeposits,clearedWithdrawals, rowData) => {
    console.log('clears', clearedBal,clearedDeposits,clearedWithdrawals)
    var newClearedList = Object.assign({}, clearedList)
    newClearedList['transids'].push(rowData.transid)
    // add or subtract the value of the checked transaction as appropriate
    if(rowData.debit !== null) {
        clearedDeposits += parseFloat(rowData.debit)
        clearedBal += parseFloat(rowData.debit)
        newClearedList['debits'].push(parseFloat(rowData.debit))
    }
    if(rowData.credit !== null) {
        clearedWithdrawals -= parseFloat(rowData.credit)
        clearedBal -= parseFloat(rowData.credit)
        newClearedList['credits'].push(parseFloat(rowData.credit))
    }
    var returnObj = {
        'clearedDepositsTotal': clearedDeposits,
        'clearedWithdrawalsTotal': clearedWithdrawals,
        'clearedTotal': clearedBal,
        'clearedList': newClearedList
        }
        console.log('new clears in cleartally: ', returnObj)
    return returnObj

}

export {ClearTally, UpdateClearTally}