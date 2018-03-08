import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  process.env.MAIL_URL = "smtps://postmaster%40nazar-registration-application.herokuapp.com:9a5ba16b5a316ea0a6041ea7d5d95977-2b4c5a6c-ec92a9f0@smtp.mailgun.org:465";
});
