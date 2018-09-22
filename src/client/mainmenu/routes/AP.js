import React from 'react'
import {
    Route,
    Link
  } from 'react-router-dom'
import EnterInvoice from './endpoints/enterSupplierInvoice'
import SearchInvoices from './endpoints/ap/SearchAPInvoices'
import SearchSuppliers from './endpoints/ap/SearchSuppliers'

import 'css/subRoutes.css'

const AP = ({ match }) => (
    <div id="subRoutes">
      <Link to={`${match.url}/enterInvoice`} id="enterInvoice" className="nav">
        Enter Invoice</Link>
      <br/><Link to={`${match.url}/searchInvoices`} id="searchInvoices" className="nav">
        Search Invoices</Link>
      <br/><Link to={`${match.url}/searchSuppliers`} id="searchSuppliers" className="nav">
        Search Suppliers</Link>

    <Route path="/accounting/ap/enterInvoice" component={EnterInvoice}/>
    <Route path="/accounting/ap/searchInvoices" component={SearchInvoices}/>
    <Route path="/accounting/ap/searchSuppliers" component={SearchSuppliers}/>

    </div>
  )

export default AP;