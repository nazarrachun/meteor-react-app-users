import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import classNames from 'classnames';
import { People } from '/imports/api/people/people';
import { addHuman } from '/imports/api/people/methods';
import { removeHuman } from '/imports/api/people/methods';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '/imports/ui/components/Styles/flexbox.css';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {};

    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    const { name, age, sex, street } = this;
    const nameValue = name && name.getValue();
    const ageValue = age && parseInt(age.getValue());
    const sexValue = sex && sex.getValue();
    const streetValue = street && street.getValue();

    this.props.handleSubmit(nameValue, ageValue, sexValue, streetValue)
  }

  handleRemove(_id) {
    removeHuman.call({ _id });
  }

  render() {
    return (
      <section className="container">
        <form className="left-half" onSubmit={this.handleSubmit}>
          <h1>Home page</h1>
          <TextField  ref={(elem) => {this.name=elem;}}  floatingLabelText="Name"  floatingLabelFixed={true} />
          <br />
          <TextField  ref={(elem) => {this.age=elem;}}  floatingLabelText="Age"  floatingLabelFixed={true} />
          <br />
          <TextField  ref={(elem) => {this.sex=elem;}}  floatingLabelText="Sex"  floatingLabelFixed={true} />
          <br />
          <TextField  ref={(elem) => {this.street=elem;}}  floatingLabelText="Street"  floatingLabelFixed={true} />
          <br /><br />
          <RaisedButton label="Submit" onClick={this.onSubmit} default />
        </form>

        {this.props.people.length ?
          <table className="right-half">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Street</th>
              </tr>
            </thead>
            <tbody>
              {this.props.people.map(human => <tr key={human._id}>
                <td>{human.name}</td>
                <td>{human.age}</td>
                <td>{human.sex}</td>
                <td>{human.street}</td>
                <td><RaisedButton label="Edit" href={`/edit/${human._id}`} primary /></td>
                <td><RaisedButton label="Remove" onClick={this.handleRemove.bind(this, human._id)} secondary /></td>
              </tr>)}
            </tbody>
          </table> : null}
        </section>
      );
    }
  }

  export default createContainer(() => {
    const handleSubmit = (name, age, sex, street) => {
      addHuman.call({
        name,
        age,
        sex,
        street
      });
    }
    const peopleHandle = Meteor.subscribe('people');
    const people = peopleHandle.ready() ? People.find().fetch() : [];

    return {
      people,
      handleSubmit
    };
  }, Home);
