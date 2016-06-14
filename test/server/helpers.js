const moment = require('moment');
const uuid = require('uuid-v4');
const db = require('../../src/server/app').db;
const consts = require('../../src/server/consts');

module.exports.setupDb = function(done) {
  let appts = [];
  for (var i = 0; i < 100; i++) {
    let m = moment().add(i, 'days')
    appts.push({
      id: uuid(),
      title: 'Test Appointment',
      description: 'This exists for testing only',
      datetime: m.toDate(),
      date: m.format(consts.DATE),
      time: m.format(consts.TIME)
    });
  }
  db.store = appts;
  done();
}

