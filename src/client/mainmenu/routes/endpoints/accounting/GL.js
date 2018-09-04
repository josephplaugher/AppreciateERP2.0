import * as ReactForm from 'reactform-appco'
import React from 'react'
import ReactTable from 'react-table'
//import LightBox from 'Util/LightBox'
import 'react-table/react-table.css'
import 'css/workingPane.css'
import 'css/form.css'

const Form = ReactForm.Form;
const Input = ReactForm.Input;
const Button = ReactForm.Button;

class GL extends React.Component {
  
    state = {};

    render() {
      const userNotify = this.state;

      this.route = 'glJSON';

      const columns = [
        {Header: 'Trans Id', accessor: 'transid'},
        {Header: 'Date', accessor: 'date'},
        {Header: 'Debit', accessor: 'debit'}, 
        {Header: 'Credit', accessor: 'credit'},
        {Header: 'Account Name', accessor: 'acctname'},
        {Header: 'Account Number', accessor: 'acctno'},
        {Header: 'Transaction Type', accessor: 'transtype'}]

      return (
      <div id="workingPane">
        <Form formTitle="Search General Ledger" onSubmit={this.onSubmit} route="http://localhost:3004/glJSON" >
        <Input name="startdate" label="Start Date" value={this.state.startdate} onChange={this.onChange} error={userNotify.startdate}/>
        <Input name="enddate" label="End Date" value={this.state.enddate} onChange={this.onChange} error={userNotify.enddate}/>
        <div className="buttondiv">
        <Button id="search" value="Search" />
        </div>
        </Form><br/>
          <div id="resultField">
          <ReactTable
            data={this.state.success}
            columns={columns}
          />
          </div>
      </div>
      )
    }
}

export default GL;