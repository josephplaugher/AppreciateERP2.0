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
import './je.css'

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
        accts: [],
        dorc: [],
        amount: []
      },
      ledgerdate: '',
      description: '',
      acct: [],
      dorc: [],
      amount: [],
      lsracct: '',
      jeRows: []
    }
    this.response = this.response.bind(this)
  }

  componentDidMount = () => {
    const dorcOptions = ['Debit', 'Credit']
    var jeRows = []
    var i = 1
    do {
      /* prettier-ignore */
      jeRows.push(<div className="">
        <Input name={`acct${i}`} label="Account" value={this.state.acct[i]} onChange={this.onChange} lsr={this.state.lsracct[i]} />
        <Select name={`dorc${i}`} label="Debit or Credit" options={dorcOptions} value={this.state.dorc[i]} onChange={this.onChange} multiple={false} />
        <Input name={`amount${i}`} label="Amount" value={this.state.amount[i]} onChange={this.onChange} />
        </div>)
      i = i + 1
    } while (i < 50)
    this.setState({ jeRows: jeRows })
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
    return (
      <>
        <div id="workingPane">
          <p className="formTitle">Journal Entry</p>
          <form onSubmit={this.onSubmit}>
            {/* prettier-ignore */}
            <>
            <Input name="ledgerdate" label="Ledger Date" value={this.state.ledgerstartdate} onChange={this.onChange} />
            <Input name="description" label="Description" value={this.state.description}  onChange={this.onChange} />
            <div id="je-rows">
            {this.state.jeRows}
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
