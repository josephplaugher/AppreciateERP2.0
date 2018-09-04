import React from 'react'
import Ajax from 'Util/Ajax'
import ReactTable from 'react-table'
import LightBox from 'Util/LightBox'
import Form from 'Util/Form'
import Input from 'Util/Input'
import Button from 'Util/Button'
import 'react-table/react-table.css'
import 'css/workingPane.css'
import 'css/form.css'

class COA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      coa:[]
    }
  }
  
  componentDidMount() {
      Ajax.get("http://localhost:3004/coa")
      .then((res) => {
        if(res.data.success){
          console.log(res.data.success);
          this.setState({
            coa: res.data.success
            })
        }
      })
      .error((er) => {console.error(er)});
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
            <ReactTable
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {this.selectItem(rowInfo.original);}
                }
                }
              }
              data={this.state.coa}
              columns={columns}
            />
            </div>
            
            <div >  
            {this.state.dataView ? (
              <div id="lightbox-container" className="lightbox-background">
              <LightBox close={this.closeLightBox} >
                <Form formTitle="Account Details" onSubmit={this.onSubmit}  >
                <Input name="acctno" label="Account Number" value={this.state.acctno} onChange={this.onChange} error={this.state.userNotify.acctno} />
                <Input name="acctname" label="Account Name" value={this.state.acctname} onChange={this.onChange} error={this.state.userNotify.acctname}/>
                <Input name="description" label="Description" value={this.state.description} onChange={this.onChange} error={this.state.userNotify.description}/>
                <Input name="type" label="Type" value={this.state.type} onChange={this.onChange} error={this.state.userNotify.type}/>
                <Input name="subtype" label="Sub Type" value={this.state.subtype} onChange={this.onChange} error={this.state.userNotify.subtype} />
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