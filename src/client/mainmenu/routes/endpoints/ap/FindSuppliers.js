import React from 'react'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import FormClass from 'Util/FormClass'
import Input from 'Util/Input'
import ReadOnlyInput from 'Util/ReadOnlyInput'
import Button from 'Util/Button'
import ValRules from 'Util/ValRules'
import LightBox from 'Util/LightBox'
import 'css/workingPane.css'
import 'css/form.css'

class FindSuppliers extends FormClass{
  constructor(props) {
    super(props);
    this.useLiveSearch = true
    this.route = '/people/findSuppliers'
    this.valRules = ValRules
    this.state = {
      dataView: false,
      table: [],
      userNotify: {},
      formData: {
        supplierid: '',
        supplier: '',
        contact: '',
        phone: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      supplierid: '',
      supplier:  '',
      contact: '',
      phone: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      supplier: '',
    }
  }

  selectItem = (row) => {
    //place all the resulting data for the clicked row into current view state
    var newView = {};
    for (var key in row) {
      //fill with new data select
      if(!row[key]) {
        newView[key] = '';
      } else {
        newView[key] = row[key]
      }
    }
      this.setState({
        currentView: newView,
        dataView: true, 
        userNotify: {}
      });
  }

  response = (res) => {
    console.log('resp: ', res)
    this.setState({
      table: res.data.table
    });
    if (res.error) {
      console.error('submit error: ', res.error);
    }
  }

  render() {

    const columns = [
      { Header: 'supplier', accessor: 'name' },
      { Header: 'Contact Name', accessor: 'contact' }]

    return (
      <div id="workingPane">
      <EB comp="Form in FindSuppliers" >
      <p className="formTitle">Find Suppliers</p>
      <form onSubmit={this.onSubmit} >
        <Input name="supplierid" label="ID" value={this.state.supplierid} onChange={this.onChange} lsr={this.state.lsrsupplierid}/>
        <Input name="supplier" label="Supplier Name" value={this.state.supplier} onChange={this.onChange}lsr={this.state.lsrsupplier}/>
        <Input name="contact" label="Cantact Name" value={this.state.contact} onChange={this.onChange} />
        <Input name="phone" label="Phone" value={this.state.phone} onChange={this.onChange}/>
        <Input name="email" label="Email" value={this.state.email} onChange={this.onChange}/>
        <Input name="street" label="Street" value={this.state.street} onChange={this.onChange}/>
        <Input name="city" label="City" value={this.state.city} onChange={this.onChange}/>
        <Input name="state" label="State" value={this.state.state} onChange={this.onChange}/>
        <Input name="zip" label="zip" value={this.state.zip} onChange={this.onChange}/>
        <div className="buttondiv">
        <Button id="submit" value="Submit" />
        </div>
      </form>
      </EB>
      <div id="resultField">
        <EB comp="ReactTable in Searchsuppliers">
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
              <p className="formTitle">Supplier Details</p>
                <form  onClick={this.onSave}>
                <ReadOnlyInput name="id" label="ID" value={this.state.currentView.supplierid} onChange={this.onChange}/>
                <Input name="name" label="Name" value={this.state.currentView.supplier} onChange={this.onChange}/>
                <Input name="contact" label="Cantact Name" value={this.state.currentView.contact} onChange={this.onChange} />
                <Input name="phone" label="Phone" value={this.state.currentView.phone} onChange={this.onChange}/>
                <Input name="email" label="Email" value={this.state.currentView.email} onChange={this.onChange}/>
                <Input name="street" label="Street" value={this.state.currentView.street} onChange={this.onChange}/>
                <Input name="city" label="City" value={this.state.currentView.city} onChange={this.onChange}/>
                <Input name="state" label="State" value={this.state.currentView.state} onChange={this.onChange}/>
                <Input name="zip" label="zip" value={this.state.currentView.zip} onChange={this.onChange}/>
                <div className="buttondiv">
                <Button id="submit" value="Save Changes" />
                </div>
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

export default FindSuppliers;