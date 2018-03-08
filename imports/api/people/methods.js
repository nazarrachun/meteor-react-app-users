import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Accounts } from 'meteor/accounts-base';
import { People } from '/imports/api/people/people';

export const addHuman = new ValidatedMethod({
  name: 'add.human',
  validate: new SimpleSchema({
    name: { type: String },
    age: { type: Number },
    sex: { type: String },
    street: { type: String }
  }).validator(),
  run({ name, age, sex, street }) {
    People.insert({ name, age, sex, street });
  }
});

export const removeHuman = new ValidatedMethod({
  name: 'remove.human',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    People.remove({ _id });
  }
});

export const editHuman = new ValidatedMethod({
  name: 'edit.human',
  validate: new SimpleSchema({
    _id: { type: String },
    name: { type: String },
    age: { type: Number },
    sex: { type: String },
    street: { type: String }
  }).validator(),
  run({_id, name, age, sex, street }) {
    People.update({_id}, {$set: {name, age, sex, street }});
  }
});

export const registerUser = new ValidatedMethod({
  name: 'user.register',
  validate: new SimpleSchema({
    email: { type: String },
    password: { type: String }
  }).validator(),
  run({ email, password }) {
    if (Meteor.isServer) {
console.log(1);
      const user = Accounts.findUserByEmail(email);
      console.log(2);

      if (user) {
        throw new Meteor.Error('user already registered');
        console.log(3);

      } else {
        const userID = Accounts.createUser({
          email,
          password
        });
        console.log(userID);

        Accounts.sendVerificationEmail(userID);
        console.log(5);

      }
    }
    return true;
  },
});
