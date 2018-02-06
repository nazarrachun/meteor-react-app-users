import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
