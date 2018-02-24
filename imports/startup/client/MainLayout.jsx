import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from '/imports/ui/components/Home.jsx';
import Edit from '/imports/ui/components/Edit.jsx';


export default class MainLayout extends React.Component {
  render() {
    return (
      <Router>
        <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/edit/:id' component={Edit} />
            </Switch>
        </div>
      </Router>
    );
  }
}
