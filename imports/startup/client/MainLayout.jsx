import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import Home from '/imports/ui/components/Home.jsx';
import Edit from '/imports/ui/components/Edit.jsx';
import Registration from '/imports/ui/components/Registration.jsx';
import Login from '/imports/ui/components/Login.jsx';
import Verify from '/imports/ui/components/Verify.jsx';
import Header from '/imports/ui/components/Header.jsx';


export default class MainLayout extends React.Component {
  render() {
    return (
      <Router>
        <div>
        <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/edit/:id' component={Edit} />
            <Route exact path='/registration' component={Registration} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/verify/:id' components={Verify} />
          </Switch>
        </div>
      </Router>
    );
  }
}
