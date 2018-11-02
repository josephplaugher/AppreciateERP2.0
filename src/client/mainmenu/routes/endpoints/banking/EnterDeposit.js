import * as ReactForm from 'reactform-appco'
import React from 'react'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

const Form = ReactForm.Form;
const Input = ReactForm.Input;
const Button = ReactForm.Button;

class EnterDeposit extends React.Component{
  
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
    if(res.success)
    this.setState({});
  }

  render() {

    return (
      <div>
      <div id="userNotify">
      </div>
      <div id="workingPane">
      <Form formTitle="Enter Deposit" action={`${process.env.BASE_URL}/trans/EnterDeposit`} response={this.response}  >
        <Input name="itemdate" label="Item Date" />
        <Input name="docno" label="Document Number" />
        <Input name="decription" label="Description" />
        <Input name="amount" label="Amount" /> 
        <Input name="bankname" label="Bank Name" />
        <Input name="bankno" label="Bank Number" />
        <Input name="acctname" label="Account Name" />
        <Input name="acctno" label="Account Number" />
        <Input name="transtype" label="Transaction Type" />
        <div className="buttondiv">
          <Button id="submit" value="Enter Deposit" />
        </div>
      </Form>
      </div>
      </div>
    )
  }
}

export default EnterDeposit;