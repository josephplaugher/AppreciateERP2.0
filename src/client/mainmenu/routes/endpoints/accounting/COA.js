import React from 'react'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import LightBox from 'Util/LightBox'
import {Form, Input, Button} from 'reactform-appco'
import 'css/workingPane.css'
import 'css/form.css'
import 'react-table/react-table.css'

class COA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table:[],
      userNotify: {}
    }
  }
  
  
  componentDidMount() {
      Ajax.get(SetUrl() + "/trans/coa")
      .then(res => {
          this.setState({
            table: res.data.table
          })
      })
  }
  
  selectItem = (row) => {
    //switch from data view to search view
    this.setState({ dataView: true, userNotify: ''});

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

    render() {
      const columns = [
        {Header: 'Account Name', accessor: 'acctname'},
        {Header: 'Account Number', accessor: 'acctno'},
        {Header: 'Description', accessor: 'description'},
        {Header: 'Type', accessor: 'type'}]

      return (
        <div id="workingPane">
          <p className="formTitle">Chart of Accounts</p>
            <div id="resultField">
            <EB comp="ReactTable in COA">
            <ReactTable
              filterable
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
                <Form formTitle="Account Details" onSubmit={this.onSubmit}  >
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

export default COA;