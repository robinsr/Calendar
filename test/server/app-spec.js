const app = require('../../src/server/app');
const helpers = require('./helpers');
const supertest = require('supertest');
const mongoose = require('mongoose');
const moment = require('moment');
const assert = require('assert');

const Appointment = mongoose.model('Appointment');
const agent = supertest.agent(app);
const acceptHeader = ['Accept', 'application/json'];

const apptOk = appt => {
  assert.equal(appt.title, 'Test Appointment');
  assert.equal(appt.description, 'This exists for testing only');
  assert.equal(typeof appt.date, 'string');
  assert.equal(typeof appt.time, 'string');
};

const monthMatch = (appt, month) => {
  assert.equal(month, moment(appt.date, 'M/D/YYYY').month());
};

describe('Express server', () => {
  before(helpers.setupDb);
  after(helpers.clearDb);

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
      const month = moment().month();
      agent.get('/appointments')
        .set(...acceptHeader)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
          const firstApp = res.body[0]
          const lastApp = res.body[res.body.length - 1];
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
          apptOk(firstApp);
          monthMatch(firstApp, month);
          apptOk(lastApp);
          monthMatch(lastApp, month);
        })
        .end(done);
    });
  });

  describe('put /appointments/:id', () => {
    it('should update an appointment', done => {
      Appointment.findOne({}, (err, doc) => {
        if (err) throw err;
        const id = doc._id;
        const title = 'This is an updated title';
        agent.put(`/appointments/${id}`)
          .send({ title })
          .set(...acceptHeader)
          .expect(200)
          .end(() => {
            Appointment.findById(id, (err, doc) => {
              if (err) throw err;
              if (!doc) throw new Error('Matching doc not found');
              assert.equal(doc.title, title);
              done();
            });
          });
      });
    });
  });
});