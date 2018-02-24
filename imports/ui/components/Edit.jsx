import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import classNames from 'classnames';
import { People } from '/imports/api/people/people';
import { editHuman } from '/imports/api/people/methods';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './flexbox.css';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
      sex: '',
      street: ''
    };

  }
  handleEdit(event) {
    event.preventDefault();
    const { name, age, sex, street } = this;
    const nameValue = name && name.getValue();
    const ageValue = age && parseInt(age.getValue());
    const sexValue = sex && sex.getValue();
    const streetValue = street && street.getValue();

    this.props.handleEdit(nameValue, ageValue, sexValue, streetValue)
  }

  render() {
    const { human } = this.props;
    const { name, age, sex, street, nameEdited, ageEdited, sexEdited, streetEdited } = this.state;
    return (
      <section className="container">
        <form className="left-half" onSubmit={this.handleEdit}>
          <h1>Edit</h1>
          <TextField
            value={!nameEdited && human.name || name}
            onChange={(e, name) => this.setState({ name, nameEdited: true })}
            ref={(elem) => {this.name=elem;}}
            floatingLabelText="Name"
            floatingLabelFixed={true} />
          <br />
          <TextField
            value={!ageEdited && human.age || age}
            onChange={(e, age) => this.setState({ age, ageEdited: true })}
            ref={(elem) => {this.age=elem;}}
            floatingLabelText="Age"
            floatingLabelFixed={true} />
          <br />
          <TextField
            value={!sexEdited && human.sex || sex}
            onChange={(e, sex) => this.setState({ sex, sexEdited: true })}
            ref={(elem) => {this.sex=elem;}}
            floatingLabelText="Sex"
            floatingLabelFixed={true} />
          <br />
          <TextField
            value={!streetEdited && human.street || street}
            onChange={(e, street) => this.setState({ street, streetEdited: true })}
            ref={(elem) => {this.street=elem;}}
            floatingLabelText="Street"
            floatingLabelFixed={true} />
          <br /><br />
          <div>
            <RaisedButton
              onClick={this.handleEdit.bind(this)}
              label="Save"
              />
          </div>
        </form>
      </section>
    );
  }
}
export default createContainer((props) => {
  const handleEdit = (_id, name, age, sex, street) => {
    editHuman.call({
      _id,
      name,
      age,
      sex,
      street
    });
  }
  const humanHandle = Meteor.subscribe('human', props.match.params.id);
  const human = humanHandle.ready() ? People.findOne({ _id: props.match.params.id }) : {};

  return {
    human,
    handleEdit
  };
}, Edit);
