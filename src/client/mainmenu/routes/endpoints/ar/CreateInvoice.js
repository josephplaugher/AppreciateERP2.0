import FormClass from 'Util/FormClass'
import React from 'react'
import Form from 'Util/Form'
import Input from 'Util/Input'
import InvoiceLines from 'Util/InvoiceLines'
import Button from 'Util/Button'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

class CreateInvoice extends FormClass{

  render() {

    this.route = 'CreateInvoice';

    return (
      <div>
      <div id="userNotify">
      </div>
      <div id="workingPane">
      <Form formTitle="Create Invoice" onSubmit={this.onSubmit}  >
        <Input name="date" label="Date" value={this.state.date} onChange={this.onChange} error={this.state.userNotify.date} />
        <Input name="description" label="Description" value={this.state.description} onChange={this.onChange} error={this.state.userNotify.description}/>
        <Input name="name" label="Customer Name" value={this.state.customer} onChange={this.onChange} error={this.state.userNotify.customer}/>
        <Input name="customerid" label="Customer ID" value={this.state.customerid} onChange={this.onChange} error={this.state.userNotify.customerid} />
        <Input name="terms" label="Terms" value={this.state.terms} onChange={this.onChange} error={this.state.userNotify.terms}/> 
        <Input name="acctname" label="Revenue Account Name" value={this.state.acctname} onChange={this.onChange} lsr={this.state.lsracctname} error={this.state.userNotify.acctname}/>
        <Input name="acctno" label="Revenue Account Number" value={this.state.acctno} onChange={this.onChange} lsr={this.state.lsracctno} error={this.state.userNotify.acctno}/>
        <br /><br />
        <InvoiceLines />
        <div className="buttondiv">
        <Button id="submit" value="Submit" />
        <Button id="addLine" value="Add a Line" onClick={this.addLine}/>
        </div>
      </Form>
      </div>
      </div>
    )
  }
}

export default CreateInvoice;