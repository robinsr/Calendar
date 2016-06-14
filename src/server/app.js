const express = require('express');
const moment = require('moment');
const path = require('path');
const uuid = require('uuid-v4');
const jsonParser = require('body-parser').json();
const consts = require('./consts');
const items = require('../common/data/items.json');

const db = {
  store: [],

  bootstrap() {
    this.store = items.map(item => {
      const { date, time } = item;
      return Object.assign(item, {
        id: uuid(),
        datetime: moment(`${date} ${time}`, 'M/D/YYYY h:mm:ss A').toDate()
      });
    });
  },

  sorter(a, b) {
    return a.datetime.getTime() > b.datetime.getTime() ? 1 : -1;
  },

  findByMonth (year, month) {
    const start = moment().year(year).month(month).startOf('month').toDate();
    const end = moment().year(year).month(month).endOf('month').toDate();
    const params = { datetime: { $gt: start, $lt: end } };
    const results = this.store
      .filter(obj => moment(obj.datetime).isBetween(start, end))
      .sort(this.sorter)
    return Promise.resolve(results);
  },

  findAll() {
    return Promise.resolve(this.store.sort(this.sorter));
  },

  update(id, newData) {
    const appt = this.store.find(appt => appt.id === id);
    if (!appt) return Promise.reject(new Error('Doc not found'));
    Object.assign(appt, newData);
    appt.datetime = moment(`${appt.date} ${appt.time}`, consts.DATETIME).toDate();
    return Promise.resolve(appt);
  }
};

// Express setup
const app = express();

// Static files from /src
app.use(express.static(path.resolve(__dirname, '..')));

const handleQueryResponse = (query, res) => {
  query
    .then(items => res.json(items))
    .catch(err => {
      console.error(err);
      return res.status(500).json(err);
    });
};

const handleUpdateOrCreate = (req, res) => {
  db.update(req.params.id, req.body)
  .then(items => res.json(items))
  .catch(err => {
    console.error(err);
    return res.status(500).json(err);
  });
};

app.get('/appointments/:year/:month', (req, res) => {
  let { year, month } = req.params;
  handleQueryResponse(db.findByMonth(year, --month), res);
});

app.get('/appointments', (req, res) => {
  const year = moment().year();
  const month = moment().month();
  handleQueryResponse(db.findByMonth(year, month), res);
});

app.get('/appointments/all', (req, res) => {
  handleQueryResponse(db.findAll(), res);
});

app.post('/appointments/:id', jsonParser, handleUpdateOrCreate);
app.put('/appointments/:id', jsonParser, handleUpdateOrCreate);

// Assume 404 since no middleware responded
app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});

// bootstrap appointments
if (process.env.NODE_ENV.match(/(prod|dev)/)) {
  db.bootstrap();
  module.exports = app;
}

if (process.env.NODE_ENV === 'test') {
  module.exports.expressIntstance = app;
  module.exports.db = db;
}
