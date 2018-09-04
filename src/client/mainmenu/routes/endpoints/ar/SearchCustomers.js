import FormClass from 'Util/FormClass'
import React from 'react'
import Form from 'Util/Form'
import Input from 'Util/Input'
import Button from 'Util/Button'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

class SearchCustomers extends FormClass{

  render() {

    this.route = 'SearchCustomers';

    return (
      <div>
      <div id="userNotify">
      </div>
      <div id="workingPane">
      <Form formTitle="Find Customers" onSubmit={this.onSubmit}  >
        <Input name="name" label="Name" value={this.state.name} onChange={this.onChange} error={this.state.userNotify.name} />
        <Input name="id" label="ID" value={this.state.id} onChange={this.onChange} error={this.state.userNotify.id}/>
        <Input name="contact" label="Cantact Name" value={this.state.contact} onChange={this.onChange} error={this.state.userNotify.contact} />
        <Input name="phone" label="Phone" value={this.state.phone} onChange={this.onChange} error={this.state.userNotify.phone}/>
        <Input name="email" label="Email" value={this.state.email} onChange={this.onChange} error={this.state.userNotify.email}/>
        <Input name="street" label="Street" value={this.state.street} onChange={this.onChange} error={this.state.userNotify.street}/>
        <Input name="city" label="City" value={this.state.city} onChange={this.onChange} error={this.state.userNotify.city}/>
        <Input name="state" label="State" value={this.state.state} onChange={this.onChange} error={this.state.userNotify.state}/>
        <Input name="zip" label="zip" value={this.state.zip} onChange={this.onChange} error={this.state.userNotify.zip}/>
        <div className="buttondiv">
        <Button id="submit" value="Submit" />
        </div>
      </Form>
      </div>
      </div>
    )
  }
}

export default SearchCustomers;