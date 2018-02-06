import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MainLayout from './MainLayout.jsx';

Meteor.startup(() => {
  ReactDOM.render(
    <MuiThemeProvider><MainLayout /></MuiThemeProvider>,
    document.getElementById('app')
  );
});
