const app = require('../../src/server/app');
const { db, expressIntstance } = app;
const consts = require('../../src/server/consts');
const helpers = require('./helpers');
const supertest = require('supertest');
const moment = require('moment');
const assert = require('assert');

const agent = supertest.agent(expressIntstance);
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
  before(helpers.setupDb);

  describe('get /', () => {
    it('should return the index page', done => {
      agent.get('/')
        .expect(200)
        .expect(/Calendar/)
        .end(done);
    });
  });

  describe('get /appointments', () => {
    it('should return this month\'s appointments', done => {
      const month = moment().month() + 1; //adjust zero-index month
      agent.get('/appointments')
        .set(...acceptHeader)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const firstApp = res.body[0]
          const lastApp = res.body[res.body.length - 1];
          responseOk(firstApp, lastApp);
          apptOk(firstApp);
          monthMatch(firstApp, month);
          apptOk(lastApp);
          monthMatch(lastApp, month);
        })
        .end(done);
    });
  });

  describe('get /appointments/all', () => {
    it('should return all appointments (for legacy apps)', done => {
      agent.get('/appointments/all')
        .set(...acceptHeader)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          const firstApp = res.body[0]
          const lastApp = res.body[res.body.length - 1];
          responseOk(firstApp, lastApp);
          apptOk(firstApp);
          apptOk(lastApp);
        })
        .end(done);
    });
  });

  describe('get /appointments/:year/:month', () => {
    it('should return appointments for a certain month', done => {
      const year = moment().add(2, 'months').year();
      const month = moment().add(2, 'months').month();
      agent.get(`/appointments/${year}/${month}`)
        .set(...acceptHeader)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          const firstApp = res.body[0]
          const lastApp = res.body[res.body.length - 1];
          responseOk(firstApp, lastApp);
          apptOk(firstApp);
          monthMatch(firstApp, month);
          apptOk(lastApp);
          monthMatch(lastApp, month);
        })
        .end(done);
    });
  });

  describe('post /appointments/:id', () => {
    it('should update an appointment title', done => {
      const doc = db.store[0];
      const title = 'This is an updated title';
      agent.post(`/appointments/${doc.id}`)
        .send({ title })
        .set(...acceptHeader)
        .expect(200)
        .end(() => {
          assert.equal(doc.title, title);
          done();
        });
    });

    it('should update an appointment date', done => {
      const parentDate = moment().add(1, 'month').startOf('month').day(1);
      const start = moment(parentDate).startOf('day').toDate();
      const end = moment(parentDate).endOf('day').toDate();
      const doc = db.store[0];
      const date = moment(doc.date, consts.DATE).add(1, 'day').format(consts.DATE);
      agent.post(`/appointments/${doc.id}`)
        .send({ date })
        .set(...acceptHeader)
        .expect(200)
        .end(() => {
          assert.equal(doc.date, date);
          done();
        });
    });
  });
});