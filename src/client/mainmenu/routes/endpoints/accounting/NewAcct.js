import React from 'react'
import EB from 'Util/EB'
import FormClass from 'Util/FormClass'
import Input from 'Util/Input'
import Select from 'Util/Select'
import Button from 'Util/Button'
import ValRules from './CustValRules'
import 'css/workingPane.css'
import 'css/form.css'

class NewAcct extends FormClass{
  constructor(props) {
    super(props);
    this.useLiveSearch = false;
    this.route = '/trans/newAcct'
    this.valRules = ValRules
    this.state = {
      userNotify: {},
      formData: {
        acctno: '',
        acctname: '',
        description: '',
        type: '',
        cor_acctno: '',
        cor_acctname: '',
        cor_description: '',
        parent_acctno: '',
        parent_acctname: ''
      },
      acctno: '',
      acctname: '',
      description: '',
      type: '',
      cor_acctno: '',
      cor_acctname: '',
      cor_description: '',
      parent_acctno: '',
      parent_acctname: ''
    }
  }

  response = (res) => {
    this.setState({
      table: res.data.table
    });
    if (res.error) {
      console.error('submit error: ', res.error);
    }
  }

  render() {
    const typeOptions = ['Revenue','Expense','Bank','Current Asset','Fixed Asset','Intangible Asset','Credit Card','Current Liability','Long-Term Liability','Equity','Subsidiary']
    
    return (
      <div id="workingPane">
      <EB comp="Form in NewAcct" >
      <p className="formTitle">Create New Account</p>
      <form onSubmit={this.onSubmit} >
        <Input name="acctno" label="Account Number" value={this.state.acctno} onChange={this.onChange} />
        <Input name="acctname" label="Account Name" value={this.state.acctname} onChange={this.onChange} />
        <Input name="description" label="Description" value={this.state.description} onChange={this.onChange} />
        <Select name="type" label="Type" options={typeOptions} value={this.state.type} onChange={this.onChange}/><br/>
        {this.state.type === 'Fixed Asset' ?
        <>
        <p className="text">Depreciation Account Details</p>  
          <Input name="cor_acctno" label="Depreciation Account Number" value={this.state.cor_acctno} onChange={this.onChange} />
          <Input name="cor_acctname" label="Depreciation Account Name" value={this.state.cor_acctname} onChange={this.onChange} />
          <Input name="cor_description" label="Depreciation Account Description" value={this.state.cor_description} onChange={this.onChange} />
        </> : (null)}
        {this.state.type === 'Intangible Asset' ?
        <>
        <p className="text">Ammortization Account Details</p>  
          <Input name="cor_acctno" label="Ammortization Account Number" value={this.state.cor_acctno} onChange={this.onChange} />
          <Input name="cor_acctname" label="Ammortization Account Name" value={this.state.cor_acctname} onChange={this.onChange} />
          <Input name="cor_description" label="Ammortization Acccount Description" value={this.state.cor_description} onChange={this.onChange} />
        </>: (null)}
        {this.state.type === 'Subsidiary' ?
        <>
        <p className="text">Parent Account Details</p>  
          <Input name="parent_acctno" label="Parent Account Number" value={this.state.parent_acctno} onChange={this.onChange} />
          <Input name="parent_acctname" label="Parent Account Name" value={this.state.parent_acctname} onChange={this.onChange} />
        </> : (null)}   
        <div className="buttondiv">
        <Button id="submit" value="Submit" />
        </div>
      </form>
      </EB>
      </div>
    )
  }
}

export default NewAcct;