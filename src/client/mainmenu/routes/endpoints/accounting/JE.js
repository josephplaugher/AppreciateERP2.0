import React from 'react'
import EB from 'Util/EB'
import FormClass from 'Util/FormClass'
import Input from 'Util/Input'
import Select from 'Util/Select'
import ReadOnlyInput from 'Util/ReadOnlyInput'
import Button from 'Util/Button'
import ValRules from 'Util/ValRules'
import 'css/workingPane.css'
import 'css/form.css'

class JE extends FormClass {
  constructor(props) {
    super(props)
    this.useLiveSearch = true
    this.route = '/trans/je'
    this.valRules = ValRules
    this.state = {
      userNotify: {},
      formData: {
        ledgerdate: '',
        description: '',
        acct: [],
        dorc: [],
        amount: []
      },
      ledgerdate: '',
      description: '',
      acct: [],
      dorc: [],
      amount: [],
      lsracct: ''
    }
    this.response = this.response.bind(this)
  }

  response = res => {
    this.setState({
      table: res.data.table
    })
    if (res.error) {
      console.error('submit error: ', res.error)
      this.setState({ userNotify: { error: res.error } })
    }
  }

  render() {
    const dorcOptions = ['Debit', 'Credit']

    return (
      <>
        <div id="workingPane">
          <p className="formTitle">Journal Entry</p>
          <form onSubmit={this.onSubmit}>
            {/* prettier-ignore */}
            <>
            <Input name="ledgerdate" label="Ledger Date" value={this.state.ledgerstartdate} onChange={this.onChange} />
            <Input name="description" label="Description" value={this.state.description}  onChange={this.onChange} />
            <div className="journalEntry">
              <Input name="acct" label="Account" value={this.state.acct} onChange={this.onChange} lsr={this.state.lsracct} />
              <Select name="dorc" label="Debit or Credit" options={dorcOptions} value={this.state.dorc} onChange={this.onChange} multiple={false} />
              <Input name="amount" label="Amount" value={this.state.amount} onChange={this.onChange} />
            </div>
            <div className="journalEntry">
              <Input name="acct" label="Account" value={this.state.acct} onChange={this.onChange} lsr={this.state.lsracct} />
              <Select name="dorc" label="Debit or Credit" options={dorcOptions} value={this.state.dorc} onChange={this.onChange} multiple={false} />
              <Input name="amount" label="Amount" value={this.state.amount} onChange={this.onChange} />
            </div>
            <div className="journalEntry">
              <Input name="acct" label="Account" value={this.state.acct} onChange={this.onChange} lsr={this.state.lsracct} />
              <Select name="dorc" label="Debit or Credit" options={dorcOptions} value={this.state.dorc} onChange={this.onChange} multiple={false} />
              <Input name="amount" label="Amount" value={this.state.amount} onChange={this.onChange} />
            </div>
            </>
            <div className="buttondiv">
              <Button id="submit" value="Submit" />
            </div>
            {this.state.userNotify.success}
          </form>
        </div>
      </>
    )
  }
}

export default JE
