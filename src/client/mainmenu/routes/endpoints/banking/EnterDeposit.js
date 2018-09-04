import FormClass from 'Util/FormClass'
import React from 'react'
import Form from 'Util/Form'
import Input from 'Util/Input'
import Button from 'Util/Button'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

class EnterDeposit extends FormClass{

  render() {

    this.route = 'EnterDeposit';

    return (
      <div>
      <div id="userNotify">
      </div>
      <div id="workingPane">
      <Form formTitle="Enter Deposit" onSubmit={this.onSubmit}  >
        <Input name="date" label="Date" value={this.state.date} onChange={this.onChange} error={this.state.userNotify.date} />
        <Input name="docno" label="Document Number" value={this.state.docno} onChange={this.onChange} error={this.state.userNotify.docno}/>
        <Input name="decription" label="Description" value={this.state.description} onChange={this.onChange} error={this.state.userNotify.description} />
        <Input name="amount" label="Amount" value={this.state.amount} onChange={this.onChange} error={this.state.userNotify.amount}/> 
        <Input name="bankname" label="Bank Name" value={this.state.bankname} onChange={this.onChange} lsr={this.state.lsrbankname} error={this.state.userNotify.bankname}/>
        <Input name="bankno" label="Bank Number" value={this.state.bankno} onChange={this.onChange} lsr={this.state.lsrbankno} error={this.state.userNotify.bankno}/>
        <Input name="acctname" label="Account Name" value={this.state.acctname} onChange={this.onChange} onBlur={this.onFocusOut} lsr={this.state.lsracctname} error={this.state.userNotify.acctname}/>
        <Input name="acctno" label="Account Number" value={this.state.acctno} onChange={this.onChange} lsr={this.state.lsracctno} error={this.state.userNotify.acctno}/>
        <Input name="transtype" label="Transaction Type" value={this.state.transtype} onChange={this.onChange} error={this.state.userNotify.transtype}/>
        <div className="buttondiv">
        <Button id="submit" value="Submit" />
        </div>
      </Form>
      </div>
      </div>
    )
  }
}

export default EnterDeposit;