const mongoose = require('mongoose');
const moment = require('moment');

const Appointment = mongoose.model('Appointment');

module.exports.clearDb = function(done) {
  Appointment.remove(done);
};

module.exports.setupDb = function(done) {
  let appts = [];
  for (var i = 0; i < 100; i++) {
    appts.push({
      title: 'Test Appointment',
      description: 'This exists for testing only',
      datetime: moment().add(i, 'days').toDate()
    });
  }
  Appointment.insertMany(appts, done);
}

