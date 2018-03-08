import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import classNames from 'classnames';
import { People } from '/imports/api/people/people';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Accounts } from 'meteor/accounts-base';
import { registerUser } from '/imports/api/people/methods';
import '/imports/ui/components/Styles/flexbox.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


class Registration extends React.Component {
  constructor(){
    super();

    this.state = {};

    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();

    const { email, password } = this;
    const emailValue = email.getValue();
    const passwordValue = password.getValue();

    this.props.handleEdit(emailValue, passwordValue );
  }
  render() {
    const style ={margin: 12};
    return (
      <form onSubmit={this.handleEdit} className="container-column"  >
        <h3>Register Account</h3>
        <div>
          <TextField ref={(elem) => {this.email=elem;}} hintText="Email" type="email" /> <br />
          <TextField ref={(elem) => {this.password=elem;}} hintText="Password" type="password" /> <br />
          <div>
            <RaisedButton label="Register account" onClick={this.onSubmit} primary={true} />
          </div>
        </div>
      </form>
    )};
  }
  export default createContainer(() => {
    const handleEdit = (email, password ) => {
      registerUser.call({
        email,
        password
      });
    }
    const peopleHandle = Meteor.subscribe('people');
    const people = peopleHandle.ready() ? People.find().fetch() : [];
    return {
      people,
      handleEdit
    };
  }, Registration);
