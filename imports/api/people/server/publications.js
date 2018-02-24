import { Meteor } from 'meteor/meteor';

import { People } from '/imports/api/people/people';

Meteor.publish('people', () => People.find());

Meteor.publish('human', _id => People.find({ _id }));
