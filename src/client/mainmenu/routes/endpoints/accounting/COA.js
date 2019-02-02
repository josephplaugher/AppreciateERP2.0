import React from 'react'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import LightBox from 'Util/LightBox'
//import {Form, Input, Button} from 'reactform-appco'
import Input from 'Util/Input'
import ReadOnlyInput from 'Util/ReadOnlyInput'
import Button from 'Util/Button'
import ValRules from 'Util/ValRules'
import Validate from 'Util/Validate'
import 'css/workingPane.css'
import 'css/form.css'
import 'react-table/react-table.css'

class COA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table:[],
      formData: {},
      acctno: '',
      acctname: '',
      description: '',
      type: '',
      extraData: {},
      userNotify: {}
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.submitData = this.submitData.bind(this)
    this.response = this.response.bind(this)
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
    //switch from list view to account view
    this.setState({ dataView: true, userNotify: ''});
    //place all the resulting data into state
    for(var key in row){
      //fill with new data select
      this.setState({
        [key]: row[key]
      }); 
    }
  }

  closeLightBox = () => {
    this.setState({dataView: false});
  }

  onChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    //clear the error on resume typing
    let clEr = Object.assign({}, this.state.userNotify);
    clEr[name] = '';
    this.setState({
      userNotify: clEr,
    });
    //place updated data into state
    this.rebuildFormData(name,value);
  }

  rebuildFormData = (name,value) => {
    //place updated data into state
    let newVals = Object.assign({}, this.state.formData);
    newVals[name] = value;
    this.setState({
      [name]: value,
      formData: newVals
    });
  }

  onSubmit = (event,valRules) => {
    //validate the inputs first
    event.preventDefault();
    let val = new Validate(this.state.formData, valRules);
    let prom = val.isError();
    prom.then((error) => {
        if (error.hasError) {
            this.setState({
                userNotify: error,
                validForm: false
            })
        }else {
            this.setState({
                validForm: true,
                userNotify: {}
            })
            //once we're happy with data, submit it
            this.submitData();
        }
    })
}

  submitData = () => {
    let bodyData;
    if (typeof this.state.extraData !== 'undefined') {
      bodyData = Object.assign(this.state.extraData, this.state.formData);
    } else {
      bodyData = this.state.formData;
    }
    Ajax.post(SetUrl() + '/action', bodyData)
      .then((resp) => {
        if (typeof resp.data.error == 'undefined') {
            this.setState({
              userNotify: {}
            });
          this.response(resp.data);
        } else {
          this.setState({
            userNotify: resp.data.error
          });
        }
      });
  }

  response = (res) => {
    console.log(res)
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
                <p className="formTitle">Account Details</p>
                <form onSubmit={this.onSubmit} >
                <ReadOnlyInput name="acctno" label="Account Number" value={this.state.acctno} />
                <Input name="acctname" label="Account Name" value={this.state.acctname} onChange={this.onChange} ls="false"/>
                <Input name="description" label="Description" value={this.state.description} onChange={this.onChange} ls="false"/>
                <Input name="type" label="Type" value={this.state.type} onChange={this.onChange} ls="false"/>
                <div className="buttondiv"><Button type="submit" value="Save Changes"/></div>
                </form>
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