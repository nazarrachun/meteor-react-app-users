import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import '/imports/ui/components/Styles/flexbox2.css';

export default class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <h1 className="logo"><a href="#">Simple application</a></h1>
        <ul className="main-nav">
          <li><a href="/">Home</a></li>
          <li><a href="/registration">Registration</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </header>
    );
  }
}
