import React from 'react'
import EB from 'Util/EB'
import FormClass from 'Util/FormClass'
import Input from 'Util/Input'
import Button from 'Util/Button'
import ValRules from 'Util/ValRules'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

class CreateInvoice extends FormClass{
  constructor(props) {
    super(props);
    this.useLiveSearch = true
    this.route = '/trans/newInvoice'
    this.valRules = ValRules
    this.state = {
      userNotify: {},
      date: '',
      customer: '',
      customerid: '',
      terms: '',
      acctname: '',
      acctno: '',
      description: '',
      item_0: '',
      price_0: '',
      quant_0: '',
      item_1: '',
      price_1: '',
      quant_1: '',
    }
    this.response = this.response.bind(this);
  }

  response = (res) => {
    console.log('response', res)
    if(res.success) {
      this.setState({userNotify: res.success})
    } 
    if(res.error) {
      this.setState({userNotify: res.error})
    }
  }

  
  render() {

    return (
      <>
      
      <div id="workingPane">
      <p className="formTitle">Create Invoice</p>
      <form onSubmit={this.onSubmit} >
          <Input name="date" label="Date" value={this.state.date} onChange={this.onChange} />
          <Input name="description" label="Description" value={this.state.description} onChange={this.onChange} />
          <Input name="customer" label="Customer Name" value={this.state.customer} onChange={this.onChange} lsr={this.state.lsrcustomer} />
          <Input name="customerid" label="Customer ID" value={this.state.customerid} onChange={this.onChange} lsr={this.state.lsrcustomerid}/>
          <Input name="terms" label="Terms" value={this.state.terms} onChange={this.onChange}/> 
          <Input name="acctname" label="Revenue Account Name" value={this.state.acctname} onChange={this.onChange} lsr={this.state.lsracctname}/>
          <Input name="acctno" label="Revenue Account Number" value={this.state.acctno} onChange={this.onChange} lsr={this.state.lsracctno}/>
          <br/><br/>
            <Input name="item_0" label="Item" onChange={this.onChange} />
            <Input name="price_0" label="Price" onChange={this.onChange} />
            <Input name="quant_0" label="Quantity" onChange={this.onChange} /><br/>
            <Input name="item_1" label="Item" onChange={this.onChange} />
            <Input name="price_1" label="Price" onChange={this.onChange} />
            <Input name="quant_1" label="Quantity" onChange={this.onChange} />
          <div className="buttondiv">
          <Button id="submit" value="Create Invoice" />
          </div>
      </form>
        <div className="buttondiv">
          <Button id="addLine" value="Add a Line" onClick={this.addLine}/>
        </div>
        <div id="userNotify">
          {this.state.userNotify.success}
        </div>
      </div>
      </>
    )
  }
}

export default CreateInvoice;