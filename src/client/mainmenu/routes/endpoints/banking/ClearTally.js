const ClearTally = (table) => {
    // table.shift() // remove the header object from the array
    let clearedList = [];
    let deposits = []
    let withdrawals = []
    var clearedDepositsTotal = 0
    var clearedWithdrawalsTotal = 0
    // build the cleared list to be placed into state and to send
    // to the server to be cleared
    var i;
    for(i=0; i<table.length; i++) {
        if(table[i].clr === 'true') {
            clearedList.push(table[i].transid)
            
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

const UpdateClearTally = (clearedList,clearedBal,clearedDeposits,clearedWithdrawals,rowData,checked) => {
    // console.log('clears', clearedBal,clearedDeposits,clearedWithdrawals    
    // add or subtract the value of the checked transaction as appropriate
    // if the checked box was checked, add that item to the tally
    if(checked === true) {
        clearedList.push(rowData.transid)
        if(rowData.debit !== null) {
            clearedDeposits += parseFloat(rowData.debit)
            clearedBal += parseFloat(rowData.debit)
        }
        if(rowData.credit !== null) {
            clearedWithdrawals -= parseFloat(rowData.credit)
            clearedBal -= parseFloat(rowData.credit)
        }
    // if the checked box was not checked, remove that item from the tally
    // and from the list of cleared transactions
    } else {
        var idToRemove = clearedList.indexOf(rowData.transid);
        if (idToRemove > -1) {
            clearedList.splice(idToRemove, 1);
        }
        if(rowData.debit !== null) {
            clearedDeposits -= parseFloat(rowData.debit)
            clearedBal -= parseFloat(rowData.debit)
        }
        if(rowData.credit !== null) {
            clearedWithdrawals += parseFloat(rowData.credit)
            clearedBal += parseFloat(rowData.credit)
        }
    }
    var returnObj = {
        'clearedDepositsTotal': clearedDeposits,
        'clearedWithdrawalsTotal': clearedWithdrawals,
        'clearedTotal': clearedBal,
        'clearedList': clearedList
        }
        // console.log('new clears in cleartally: ', returnObj)
    return returnObj

}

export {ClearTally, UpdateClearTally}