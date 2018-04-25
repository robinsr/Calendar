const moment = require('moment');
const uuid = require('uuid-v4');
const db = require('../../src/server/app').db;
const consts = require('../../src/server/consts');

module.exports.getMockAppointment = () => {
  let m = moment();
  return {
    id: uuid(),
    title: 'Test Appointment',
    description: 'This exists for testing only',
    dateTime: m.toDate(),
    date: m.format(consts.DATE),
    time: m.format(consts.TIME)
  };
};
