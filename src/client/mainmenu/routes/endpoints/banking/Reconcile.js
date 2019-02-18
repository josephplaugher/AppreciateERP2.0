import React from 'react'
import EB from 'Util/EB'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import FormClass from 'Util/FormClass'
import Input from 'Util/Input'
import ReadOnlyInput from 'Util/ReadOnlyInput'
import CheckBox from 'Util/CheckBox'
import Button from 'Util/Button'
import {ClearTally,UpdateClearTally} from './ClearTally'
import LightBox from 'Util/LightBox'
import ValRules from 'Util/ValRules'
import 'css/workingPane.css'
import 'css/form.css'
import './bankrec.css'

class BankLedger extends FormClass {
  constructor(props) {
    super(props);
    this.useLiveSearch = true
    this.route = '/trans/bankRec'
    this.valRules = ValRules
    this.state = {
      dataView: false,
      userNotify: {},
      bankdata: [],
      formData: {
        stmtenddate: '2018-1-1',
        bankno: '1000',
        bankname: 'Bank'
      },
      stmtenddate: '2018-1-1',
      currentView: {},
      docdate: '',
      ledgerdate: '',
      acctname: '',
      bankname: 'Bank',
      bankno: '1000',
      acctno: '',
      transid: '',
      transtype: '',
      lsracctname: '',
      lsracctno: '',
      clearedDeposits: '',
      clearedWithdrawals: '',
      clearedBal: '',
      clearedList: {},
      lastRecBal: ''
    }
  }

  selectItem = (row) => {
    //place all the resulting data for the clicked row into current view state
    var newView = {};
    for (var key in row) {
      //fill with new data select
      if(!row[key]) {
        newView[key] = '';
      } else {
        newView[key] = row[key]
      }
    }
      this.setState({
        currentView: newView,
        dataView: true, 
        userNotify: {}
      });
  }

  response = (res) => {
    if (res.error) {
      console.error('submit error: ', res.error);
      this.setState({ userNotify: { error: res.error } })
    }
    let table = res.data.table
    this.getRecBal();
    this.clearTally(table)
    table.unshift({transid:'Trans ID',clr: null,ledgerdate: 'Ledger Date',debit:'Deposits',credit:'Withdrawals'})
    this.setState({
      bankdata: table
    }); 
  }

  getRecBal() {
    Ajax.get(SetUrl() + "/trans/getLastRecBal/" + this.state.bankno)
      .then(res => {
        if(typeof res.data.recData.ClearedBal !== 'undefined') {
          let bal = res.data.recData.ClearedBal;
          console.log('get rec bal: ', res.data)
          this.setState({
            lastRecBal: bal
          })
        } else {
          this.setState({lastRecBal: 0})
        }
  })
}

  clearTally(table) {
    let clear = ClearTally(table)
    console.log('initial clears in bank rec: ', clear)
    this.setState({
      clearedDeposits: clear.clearedDepositsTotal,
      clearedWithdrawals: clear.clearedWithdrawalsTotal,
      clearedBal: clear.clearedTotal,
      clearedList: clear.clearedList})
  }

  setChecked(event) {
    const rowData = JSON.parse(event.target.id)
    console.log('clears before update: list, ',this.state.clearedList)
    // console.log('clr bal: ',this.state.clearedBal)
    // console.log('clr dep: ',this.state.clearedDeposits)
    // console.log('clr with: ',this.state.clearedWithdrawals)
    let clear = UpdateClearTally(this.state.clearedList,this.state.clearedBal,this.state.clearedDeposits,this.state.clearedWithdrawals, rowData)
    this.setState({
      clearedDeposits: clear.clearedDepositsTotal,
      clearedWithdrawals: clear.clearedWithdrawalsTotal,
      clearedBal: clear.clearedTotal,
      clearedList: clear.clearedList})
  }

  render() {

    const table = this.state.bankdata.map( row => 
      <tr id={row.transid} key={row.transid} className="bank-rec-row" >
        <td className="bank-data-id">{row.transid}</td> 
        <td className="bank-data-checkbox">
          <CheckBox 
            name={'clearedTrans' + row.transid} 
            id={JSON.stringify(row)} 
            checked={row.clr}
            onChange={(e)=>this.setChecked(e)} 
          />
        </td>
        <td className="bank-data">{row.ledgerdate}</td>
        <td className="bank-data">{row.debit}</td> 
        <td className="bank-data">{row.credit}</td>
      </tr>
    ) 

    return (
      <>
        <div id="userNotify">{this.state.userNotify.error}</div>
        <div id="workingPane">
          <p className="formTitle">Bank Reconciliation</p>
          <form onSubmit={this.onSubmit} >
            <Input name="stmtenddate" label="Statement End Date" value={this.state.stmtenddate} onChange={this.onChange} />
            <Input name="bankname" label="Ledger Bank Name" value={this.state.bankname} onChange={this.onChange} lsr={this.state.lsrbankname} />
            <Input name="bankno" label="Ledger Bank Number" value={this.state.bankno} onChange={this.onChange} lsr={this.state.lsrbankno} />
            <div className="buttondiv">
              <Button id="search" value="Get Transactions" />
            </div>
            <div id="rec-details">
            <ReadOnlyInput name="clearedDeposits" label="Cleared Deposits" value={this.state.clearedDeposits} />
            <ReadOnlyInput name="clearedWithdrawals" label="Cleared Withdrawals" value={this.state.clearedWithdrawals} />
            <ReadOnlyInput name="clearedBal" label="Cleared Balance" value={this.state.clearedBal} />
            <ReadOnlyInput name="lastRecBal" label="Last Reconciled Balance" value={this.state.lastRecBal} />
            </div>
           
          </form><br />
          <div id="resultField">
            <EB comp="Recon table in Reconcile">
              <table>
                <tbody>
              {table} 
                </tbody>
              </table>
            </EB>
          </div>


          <div >
            {this.state.dataView ? (
              <div id="lightbox-container" className="lightbox-background">
                <LightBox close={this.closeLightBox} >
                <p className="formTitle">Transaction Details</p>
                  <form>
                    <ReadOnlyInput name="transid" label="Trans ID" value={this.state.currentView.transid} />
                    <ReadOnlyInput name="transtype" label="Transaction Type" value={this.state.currentView.transtype} />
                    <ReadOnlyInput name="docdate" label="Document Date" value={this.state.currentView.docdate} />
                    <ReadOnlyInput name="docno" label="Document Number" value={this.state.currentView.docno} />
                    <ReadOnlyInput name="ledgerdate" label="Ledger Date" value={this.state.currentView.ledgerdate} />
                    <ReadOnlyInput name="description" label="Description" value={this.state.currentView.description} />
                    <ReadOnlyInput name="acctname" label="Ledger Bank Name" value={this.state.currentView.acctname} onChange={this.onChange} lsr={this.state.lsrbankname} />
                    <ReadOnlyInput name="acctno" label="Ledger Bank Number" value={this.state.currentView.acctno} onChange={this.onChange} lsr={this.state.lsrbankno} />
                    <ReadOnlyInput name="debit" label="Debit" value={this.state.currentView.debit} />
                    <ReadOnlyInput name="credit" label="Credit" value={this.state.currentView.credit} />
                    <ReadOnlyInput name="clear" label="Cleared" value={this.state.currentView.clr} />
                  </form>
                </LightBox>
              </div>
            ) : (
                null
              )}
          </div>
        </div>
      </>
    )
  }
}

export default BankLedger