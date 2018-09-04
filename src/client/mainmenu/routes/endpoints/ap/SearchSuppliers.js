import * as ReactForm from 'reactform-appco'
import React from 'react'
import 'react-table/react-table.css'
import 'css/workingPane.css'
import 'css/form.css'
import 'css/userNotify.css'
import 'css/lsr.css'

const Form = ReactForm.Form;
const Input = ReactForm.Input;
const Button = ReactForm.Button;

class SearchSuppliers extends React.Component {
    
    state = { resultPane: false};

    render() {
        const userNotify = this.state;

        return (
            <div>
                <div id="userNotify">
                </div>
                <div id="workingPane">
                    {!this.state.resultPane ? (
                        <div id="searchPane">
                                <Form formTitle="Search Suppliers" formID="form"  >
                                <Input name="name" label="Name" value={this.state.name} onChange={this.onChange} error={userNotify.name} />
                                <Input name="id" label="ID" value={this.state.id} onChange={this.onChange} error={userNotify.id} />
                                <Input name="contact" label="Cantact Name" value={this.state.contact} onChange={this.onChange} error={userNotify.contact} />
                                <Input name="phone" label="Phone" value={this.state.phone} onChange={this.onChange} error={userNotify.phone} />
                                <Input name="email" label="Email" value={this.state.email} onChange={this.onChange} error={userNotify.email} />
                                <Input name="street" label="Street" value={this.state.street} onChange={this.onChange} error={userNotify.street} />
                                <Input name="city" label="City" value={this.state.city} onChange={this.onChange} error={userNotify.city} />
                                <Input name="state" label="State" value={this.state.state} onChange={this.onChange} error={userNotify.state} />
                                <Input name="zip" label="zip" value={this.state.zip} onChange={this.onChange} error={userNotify.zip} />
                                <div className="buttondiv">
                                    <Button id="submit" value="Submit" />
                                </div>
                            </Form>
                        </div>
                    
                    ):( 
                        <div id="resultPane"></div>
                    )}
                </div>
            </div>
        )
    }
}

export default SearchSuppliers;