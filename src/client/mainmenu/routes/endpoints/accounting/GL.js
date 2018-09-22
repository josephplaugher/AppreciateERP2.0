import * as ReactForm from 'reactform-appco'
import React from 'react'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import LightBox from 'Util/LightBox'
import 'css/workingPane.css'
import 'css/form.css'

const Form = ReactForm.Form;
const Input = ReactForm.Input;
const Button = ReactForm.Button;

class GL extends React.Component {
  
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
      { Header: 'Trans Id', accessor: 'transid' },
      { Header: 'Item Date', accessor: 'itemdate' },
      { Header: 'Ledger Date', accessor: 'gldate' },
      { Header: 'Debit', accessor: 'debit' },
      { Header: 'Credit', accessor: 'credit' },
      { Header: 'Account Name', accessor: 'acctname' },
      { Header: 'Account Number', accessor: 'acctno' },
      { Header: 'Transaction Type', accessor: 'transtype' }]

    return (
      <div id="workingPane">
        <Form formTitle="Search General Ledger" action="http://localhost:3004/trans/gl" response={this.response}  >
          <Input name="itemstartdate" label="Item Start Date" />
          <Input name="itemenddate" label="Item End Date" />
          <Input name="glstartdate" label="Ledger Start Date" />
          <Input name="glenddate" label="Ledger End Date" />
          <Input name="acctname" label="Account Name" />
          <Input name="acctno" label="Account Number" />
          <div className="buttondiv">
            <Button id="search" value="Search" />
          </div>
        </Form><br />
        <div id="resultField">
        <EB comp="ReactTable in GL">
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
                <Form formTitle="Account Details" onSubmit={this.onSubmit} clearOnSubmit="false" >
                <Input name="transid" label="Trans ID" prePopVal={this.state.transid} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="date" label="Date" prePopVal={this.state.acctno} className="textinput" labelClass="label" errorClass="input-error" />
                
                <Input name="acctno" label="Account Number" prePopVal={this.state.acctno} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="acctname" label="Account Name" prePopVal={this.state.acctname} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="description" label="Description" prePopVal={this.state.description} className="textinput" labelClass="label" errorClass="input-error" />
                <Input name="type" label="Type" prePopVal={this.state.type} className="textinput" labelClass="label" errorClass="input-error" />
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

export default GL;