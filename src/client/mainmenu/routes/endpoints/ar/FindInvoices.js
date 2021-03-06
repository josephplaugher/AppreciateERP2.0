import {Form, Input, Button} from 'reactform-appco'
import React from 'react'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import ValRules from 'Util/ValRules'
import SetUrl from 'Util/SetUrl'
import LightBox from 'Util/LightBox'
import 'css/workingPane.css'
import 'css/form.css'

class FindInvoices extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table: [],
      userNotify: {}
    }
  }

  selectItem = (row) => {
    //switch from data view to search view
    this.setState({ dataView: true, userNotify: {}});

    //place all the resulting data into state
    for(var key in row){
      //clear previous selection
      //fill with new data select
      this.setState({
        [key]: row[key]
      }); 
    }
  }

  closeLightBox = () => {
    this.setState({dataView: false});
  }

  response = (res) => {
    this.setState({
      table: res.table
    });
    if (res.error) {
      console.error('submit error: ', res.error);
    }
  }

  render() {

    const columns = [
      { Header: 'Invoice Number', accessor: 'invnum' },
      { Header: 'Credit Number', accessor: 'creditnum' },
      { Header: 'Customer', accessor: 'customer'},
      { Header: 'Invoice Date', accessor: 'invdate' },
      { Header: 'Total', accessor: 'total' }]

    return (
      <div id="workingPane">
      <EB comp="Form in FindInvoices">
      <Form formTitle="Find Invoices" 
        action={`${SetUrl()}/trans/FindInvoices`}
        valrules={ValRules}
        response={this.response}
        clearOnSubmit="false" >
        <Input name="invnum" label="Invoice Number" className="textinput" labelClass="label" errorClass="input-error" />
        <Input name="total" label="Total" className="textinput" labelClass="label" errorClass="input-error" />
        <Input name="invdate" label="Invoice Date" className="textinput" labelClass="label" errorClass="input-error" />
        <Input name="ledgerdate" label="Date Entered" className="textinput" labelClass="label" errorClass="input-error" />
        <Input name="customer" label="Customer Name" className="textinput" labelClass="label" errorClass="input-error" />
        <Input name="customerid" label="Customer ID" className="textinput" labelClass="label" errorClass="input-error" />
        <div className="buttondiv">
            <Button id="search" value="Search" />
        </div>
        </Form><br/>   
        </EB>
        <div id="resultField">
        <EB comp="ReactTable in FindInvoices">
            <ReactTable
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {this.selectItem(rowInfo.original);}
                }
                }
              }
              data={this.state.table}
              columns={columns}
            />
            </EB>
        </div>
        <div >  
            {this.state.dataView ? (
              <div id="lightbox-container" className="lightbox-background">
              <LightBox close={this.closeLightBox} >
                <Form formTitle="Invoice Details" clearOnSubmit="false" >
                <Input name="invnum" label="Invoice Number" prePopVal={this.state.invnum} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="total" label="Total" prePopVal={this.state.total} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="invdate" label="Invoice Date" prePopVal={this.state.invdate} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="date" label="Date Entered" prePopVal={this.state.date} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="customer" label="Customer Name" prePopVal={this.state.customer} className="textinput" labelClass="label" errorClass="input-error" /> 
                <Input name="customerid" label="Customer ID" prePopVal={this.state.customerid} className="textinput" labelClass="label" errorClass="input-error" />
                </Form>
              </LightBox>  
              </div>
            ):(
              null
            )}
            </div>

        </div>
    )
  }
}

export default FindInvoices;