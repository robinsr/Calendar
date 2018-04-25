const app = require('../../src/server/app');
const consts = require('../../src/server/consts');
const helpers = require('./helpers');
const supertest = require('supertest');
const moment = require('moment');
const assert = require('assert');
const nock = require('nock');

const { APPTS_SERVICE_HOST, APPTS_SERVICE_PORT } = consts.SERVICE_CONFIG;

const agent = supertest.agent(app);
const acceptHeader = ['Accept', 'application/json'];

const responseOk = (appt1, appt2) => {
  const msg = 'No appointment returned';
  assert.ok(appt1, msg);
  assert.ok(appt2, msg);
};

const apptOk = appt => {
  assert.equal(appt.title, 'Test Appointment');
  assert.equal(appt.description, 'This exists for testing only');
  assert.equal(typeof appt.date, 'string');
  assert.equal(typeof appt.time, 'string');
};

const monthMatch = (appt, month) => {
  assert.equal(month, moment(appt.date, consts.DATE).month() + 1); //adjust zero-index month
};

describe('Express server', () => {
  
  describe('get /', () => {
    it('should return the index page', done => {
      agent.get('/')
        .expect(200)
        .expect(/Calendar/)
        .end(done);
    });
  });

  describe('get /appointments', () => {
    it('should proxy the request to the appointments service', done => {
      const mockAppt = helpers.getMockAppointment();

      const appointmentsService = nock(`http://${APPTS_SERVICE_HOST}:${APPTS_SERVICE_PORT}`)
        .get('')
        .reply(200, mockAppt);

      const month = moment().month() + 1; //adjust zero-index month
      agent.get('/appointments')
        .set(...acceptHeader)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          assert.deepEqual(
            Object.assign({}, mockAppt, { dateTime: null }),
            Object.assign({}, res.body, { dateTime: null })
          );
          appointmentsService.done();
        })
        .end(done);
    });
  });
});