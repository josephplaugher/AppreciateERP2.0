import DataViewClass from 'Util/DataViewClass'
import React from 'react'
import 'react-table/react-table.css'
import Form from 'Util/Form'
import Input from 'Util/Input'
import Button from 'Util/Button'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

class FindInvoices extends DataViewClass {
  state = {
    invnum: '',
    total: '',
    invdate: '',
    date: '',
    customer: '',
    customerid: '',
    userNotify: ''
  };

/*
  constructor(props){
    super(props);
      this.state({
        invnum: '',
        total: '',
        invdate: '',
        date: '',
        customer: '',
        customerid: ''
      });
  }
*/
  render() {

    this.route = 'FindInvoices';


    return (
      <div>
      <div id="userNotify">
      </div>
      <div id="workingPane">
        
      <div id="searchPane">
        <Form formTitle="Find Invoices" onSubmit={this.onSubmit} >
        <Input name="invnum" label="Invoice Number" value={this.state.invnum} onChange={this.onChange} error={this.state.userNotify.invnum}/>
        <Input name="total" label="Total" value={this.state.total} onChange={this.onChange} error={this.state.userNotify.total}/>
        <Input name="invdate" label="Invoice Date" value={this.state.invdate} onChange={this.onChange} error={this.state.userNotify.invdate}/>
        <Input name="date" label="Date Entered" value={this.state.date} onChange={this.onChange} error={this.state.userNotify.date}/>
        <Input name="customer" label="Customer Name" value={this.state.customer} onChange={this.onChange} lsr={this.state.lsrcustomer} error={this.state.userNotify.customer} />
        <Input name="customerid" label="Customer ID" value={this.state.customerid} onChange={this.onChange} lsr={this.state.lsrcustomerid} error={this.state.userNotify.customerid}/>
        <div className="buttondiv">
        <Button id="search" value="Search" />
        </div>
        </Form><br/>
      </div>    
        <div id="resultField">
          
        </div>
      </div>
      </div>
    )
  }
}

export default FindInvoices;