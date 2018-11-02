import * as ReactForm from 'reactform-appco'
import React from 'react'
import InvoiceLines from 'Util/InvoiceLines'
import EB from 'Util/EB'
import ValRules from 'Util/ValRules'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

const Form = ReactForm.Form;
const Input = ReactForm.Input;
const Button = ReactForm.Button;

class CreateInvoice extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table: [],
      userNotify: {}
    }
    this.response = this.response.bind(this);
  }

  response = (res) => {
    console.log('response', res)
  }

  
  render() {

    return (
      <div>
      <div id="userNotify">
      {this.state.userNotify.success}
      </div>
      <div id="workingPane">
      <Form formTitle="Create Invoice" 
        action={`${process.env.BASE_URL}/trans/newInvoice`} 
        lsURL={`${process.env.BASE_URL}/liveSearch/`}
        response={this.response} 
        clearOnSubmit='false'
        valrules={ValRules}>
          <Input name="date" label="Date" className="textinput" labelClass="label" errorClass="input-error" />
          <Input name="description" label="Description" className="textinput" labelClass="label" errorClass="input-error" />
          <Input name="name" label="Customer Name" className="textinput" labelClass="label" errorClass="input-error"  />
          <Input name="customerid" label="Customer ID" className="textinput" labelClass="label" errorClass="input-error" />
          <Input name="terms" label="Terms" className="textinput" labelClass="label" errorClass="input-error"/> 
          <Input name="acctname" label="Revenue Account Name" className="textinput" labelClass="label" errorClass="input-error" />
          <Input name="acctno" label="Revenue Account Number" className="textinput" labelClass="label" errorClass="input-error" />
          <br /><br />
            <Input name="item_0" label="Item" className="textinput" labelClass="label" errorClass="input-error" />
            <Input name="price_0" label="Price" className="textinput" labelClass="label" errorClass="input-error" />
            <Input name="quant_0" label="Quantity" className="textinput" labelClass="label" errorClass="input-error" /><br/>
            <Input name="item_1" label="Item" className="textinput" labelClass="label" errorClass="input-error" />
            <Input name="price_1" label="Price" className="textinput" labelClass="label" errorClass="input-error" />
            <Input name="quant_1" label="Quantity" className="textinput" labelClass="label" errorClass="input-error" />
          <div className="buttondiv">
          <Button id="submit" value="Create Invoice" />
          </div>
      </Form>
      <div className="buttondiv">
      <Button id="addLine" value="Add a Line" onClick={this.addLine}/>
      </div>
      </div>
      </div>
    )
  }
}

export default CreateInvoice;