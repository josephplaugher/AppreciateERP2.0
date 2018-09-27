import * as ReactForm from 'reactform-appco'
import React from 'react'
import InvoiceLines from 'Util/InvoiceLines'
import EB from 'Util/EB'
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
  }
  
  render() {


    return (
      <div>
      <div id="userNotify">
      </div>
      <div id="workingPane">
      <Form formTitle="Create Invoice" action={`http://${process.env.BASE_URL}/trans/newInvoice`} response={this.response}  >
        <Input name="date" label="Date" />
        <Input name="description" label="Description" />
        <Input name="name" label="Customer Name" />
        <Input name="customerid" label="Customer ID" />
        <Input name="terms" label="Terms" /> 
        <Input name="acctname" label="Revenue Account Name" />
        <Input name="acctno" label="Revenue Account Number" />
        <br /><br />
        <Input name="item[]" label="Item" /><Input name="price[]" label="Price" /><Input name="quant[]" label="Quantity" />
        <div className="buttondiv">
        <Button id="submit" value="Create Invoice" />
        <Button id="addLine" value="Add a Line" onClick={this.addLine}/>
        </div>
      </Form>
      </div>
      </div>
    )
  }
}

export default CreateInvoice;