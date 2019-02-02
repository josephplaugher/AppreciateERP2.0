import React from 'react'
import ReactTable from 'react-table'
import EB from 'Util/EB'
import Ajax from 'Util/Ajax'
import SetUrl from 'Util/SetUrl'
import Input from 'Util/Input'
import Button from 'Util/Button'
import LightBox from 'Util/LightBox'
import Validate from 'Util/Validate'
import ValRules from 'Util/ValRules'
import LiveSearch from 'Util/LiveSearch'
import 'css/workingPane.css'
import 'css/form.css'

class GL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataView: false,
      table: [],
      userNotify: {},
      lsr: '',
      formData: {
        docstartdate: '',
        docenddate: '',
        ledgerstartdate: '',
        ledgerenddate: '',
        acctname: '',
        acctno: '',
        transid: ''
      },
      docstartdate: '',
      docenddate: '',
      ledgerstartdate: '',
      ledgerenddate: '',
      acctname: '',
      acctno: '',
      transid: '',
      ls_acctname: '',
      ls_acctno: '',
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.runLiveSearch = this.runLiveSearch.bind(this);
    this.setLSRList = this.setLSRList.bind(this);
    this.lsrSelect = this.lsrSelect.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  selectItem = (row) => {
    //switch from search view to data view
    this.setState({ dataView: true, userNotify: {} });
    //place all the resulting data into state
    for (var key in row) {
      //clear previous selection
      //fill with new data select
      this.setState({
        [key]: row[key]
      });
    }
  }

  closeLightBox = () => {
    this.setState({ dataView: false });
  }

  onChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var lsSource = [name][0];
    //clear the error on resume typing
    let clEr = Object.assign({}, this.state.userNotify);
    clEr[name] = '';
    this.setState({
      userNotify: clEr,
      lsSource: lsSource,
    });
    //place updated data into state
    this.rebuildFormData(name, value);
    const LS = new LiveSearch();
    const list = LS.getLSA();
    //run live search if applicable to current input, not othewise
    if (list.includes(name)) {
      this.runLiveSearch(LS, name, value, lsSource);
    }
  }

  runLiveSearch = (LS, name, value, lsSource) => {
    //get a list of options as the user types ,like Google live search
    //first, if the input change leaves the field blank,
    //clear the options list
    if (value === '') {
      this.setState({
        lsr: ''
      });
      //if the input value is not blank, fetch the options
    } else {
      if (LS.getLSA().includes(name)) {
        let prom = LS.search(name, value);
        prom.then((res) => {
          //run the function to build the react component
          //that contains the result set.
          //takes the result of the ajax request and
          //the name of the field in question
          this.setLSRList(res, lsSource);
        })
      }
    }//else
  }

  setLSRList = (res, lsSource) => {
    //if there is not result, set a message for that, else, set the results into state
    let list = res.data.results;
    var target = 'ls_' + lsSource;
    let newList;
    if (res.data.nr) {
      newList = res.data.nr;
    } else {
      newList = list.map((item) =>
        <p className="lsr" onClick={(event) => 
          this.lsrSelect(event)} id={item[Object.keys(item)[0]]} key={item[Object.keys(item)[0]]}>{item[Object.keys(item)[0]]}
        </p>
      );
    }
    //place the "list" value into state
    this.setState({
      [target]: newList
    });
  }

  lsrSelect = (event) => {
    //get the value of the clicked search result and place it into the form field
    //then clear the search result list
    let input = this.state.lsSource;
    this.setState({
      ls_acctno: '',
      ls_acctname: ''
    });
    this.rebuildFormData(input, event.target.id, input);
    this.autoFill(input, event.target.id);
  }

  rebuildFormData = (name, value) => {
    //place updated data into state
    let newVals = Object.assign({}, this.state.formData);
    newVals[name] = value;
    this.setState({
      [name]: value,
      formData: newVals
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    //validate the inputs first
    let val = new Validate(this.state.formData, ValRules);
    let prom = val.isError();
    prom.then((error) => {
      if (error.hasError) {
        this.setState({
          userNotify: error,
          validForm: false
        })
      } else {
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
    Ajax.post(SetUrl() + '/trans/gl', this.state.formData)
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


  autoFill = (id, val) => {
    const autofill = new AutoFill();
    var dest = autofill.getRef(id);
    //console.log('dest: ', dest);
    Ajax.get(SetUrl() + "/autofill/" + id + "/" + val)
      .then((res) => {
        if (res.data.results) {
          let obj = res.data.results;
          let val;
          for (var key in obj) {
            val = obj[key];
          }
          this.rebuildFormData(dest, val);
        }
      })
  }

  response = (res) => {
    this.setState({
      table: res.table
    });
    if (res.error) {
      console.error('submit error: ', res.error);
      this.setState({ userNotify: { error: res.error } })
    }
  }

  render() {

    const columns = [
      { Header: 'Trans Id', accessor: 'transid' },
      { Header: 'Document Date', accessor: 'docdate' },
      { Header: 'Ledger Date', accessor: 'ledgerdate' },
      { Header: 'Debit', accessor: 'debit' },
      { Header: 'Credit', accessor: 'credit' },
      { Header: 'Account Name', accessor: 'acctname' },
      { Header: 'Account Number', accessor: 'acctno' },
      { Header: 'Transaction Type', accessor: 'transtype' }]

    return (
      <>
        <div id="userNotify">{this.state.userNotify.error}</div>
        <div id="workingPane">
          <p className="formTitle">General Ledger</p>
          <form onSubmit={(event)=>{this.onSubmit(event)}} >
            <Input name="docstartdate" label="Document Start Date" value={this.state.docstartdate} onChange={this.onChange} ls="false" />
            <Input name="docenddate" label="Document End Date" value={this.state.docenddate} onChange={this.onChange} ls="false" />
            <Input name="ledgerstartdate" label="Ledger Start Date" value={this.state.ledgerstartdate} onChange={this.onChange} ls="false" />
            <Input name="ledgerenddate" label="Ledger End Date" value={this.state.ledgerenddate} onChange={this.onChange} ls="false" /><br />
            <Input name="transid" label="Transaction ID" value={this.state.transid} onChange={this.onChange} ls="false" />
            <Input name="acctname" label="Account Name" value={this.state.acctname} onChange={this.onChange} lsr={this.state.ls_acctname} />
            <Input name="acctno" label="Account Number" value={this.state.acctno} onChange={this.onChange} lsr={this.state.ls_acctno} />
            <div className="buttondiv">
              <Button id="search" value="Search" />
            </div>
          </form><br />
          <div id="resultField">
            <EB comp="ReactTable in GL">
              <ReactTable
                filterable
                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: (e, handleOriginal) => { this.selectItem(rowInfo.original); }
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
                  <Form formTitle="Transactions Details" >
                    <Input name="transid" label="Trans ID" prePopVal={this.state.transid} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="docdate" label="Document Date" prePopVal={this.state.docdate} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="ledgerdate" label="Ledger Date" prePopVal={this.state.ledgerdate} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="debit" label="Debit" prePopVal={this.state.debit} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="credit" label="Credit" prePopVal={this.state.credit} className="textinput" labelClass="label" errorClass="input-error" />
                    <Input name="transtype" label="Transaction Type" prePopVal={this.state.transtype} className="textinput" labelClass="label" errorClass="input-error" />
                  </Form>
                </LightBox>
              </div>
            ) : (
                null
              )}
          </div>
        </div>
      </>
    )
  }
}

export default GL;