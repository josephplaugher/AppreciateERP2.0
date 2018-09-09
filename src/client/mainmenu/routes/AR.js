import React from 'react'
import {
    Route,
    Link
  } from 'react-router-dom'
import FindInvoices from './endpoints/ar/FindInvoices'
import CreateInvoice from './endpoints/ar/CreateInvoice'
import SearchCustomers from './endpoints/ar/SearchCustomers'

import 'css/subRoutes.css'

const AR = ({ match }) => (
    <div id="subRoutes">
      <Link to={`${match.url}/createInvoice`} id="createInvoice" className="nav">
        Create Invoice</Link>
      <br/><Link to={`${match.url}/findInvoices`} id="searchInvoices" className="nav">
        Search Invoices</Link>
      <br/><Link to={`${match.url}/searchCustomers`} id="searchCustomers" className="nav">
        Search Customers</Link>

    <Route path="/ui/accounting/ar/findInvoices" component={FindInvoices}/>
    <Route path="/ui/accounting/ar/createInvoice" component={CreateInvoice}/>
    <Route path="/ui/accounting/ar/searchCustomers" component={SearchCustomers}/>

    </div>
  )

export default AR;