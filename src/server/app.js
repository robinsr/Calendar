const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const path = require('path');
const jsonParser = require('body-parser').json();

const consts = require('./consts');

if (!process.env.MONGO_URL) throw new Error('App requires env var MONGO_URL');

const serializeOpts = {
  virtuals: true,
  transform: function (doc, ret, options) {
    // remove the _id of every document before returning the result
    delete ret._id;
    delete ret.datetime;
  }
};

// Mongoose appointment schema setup
const AppointmentSchema = new mongoose.Schema({
  datetime: { type: Date },
  title: { type: String },
  description: { type: String }
}, {
  toObject: { virtuals: true },
  toJSON: serializeOpts
});


AppointmentSchema.virtual('date')
  .get(function() {
    return moment(this.datetime).format(consts.DATE);
  })
  .set(function (date) {
    const {time} = this;
    this.datetime = moment(`${date} ${time}`, consts.DATETIME).toDate();
  });

AppointmentSchema.virtual('time')
  .get(function() {
    return moment(this.datetime).format(consts.TIME);
  })
  .set(function (time) {
    const {date} = this;
    this.datetime = moment(`${date} ${time}`, consts.DATETIME).toDate();
  });

AppointmentSchema.pre('save', function(next) {
  const { date, time } = this;
  this.datetime = moment(`${date} ${time}`, consts.DATETIME).toDate();
  next();
});

AppointmentSchema.statics.findByMonth = function (year, month) {
  const start = moment().year(year).month(month).startOf('month').toDate();
  const end = moment().year(year).month(month).endOf('month').toDate();
  
  return this
    .find({})
    .where('datetime')
    .gt(start)
    .lt(end)
    .sort({ datetime: -1 })
    .exec();
};

AppointmentSchema.statics.findAll = function () {
  return this
    .find({})
    .sort({ datetime: -1 })
    .exec();
};

AppointmentSchema.statics.update = function (id, newData) {
  return new Promise((resolve, reject) => {
    this.findById(id, function (err, doc) {
      if (err) return reject(err);
      if (!doc) return reject(new Error('Doc not found'));
      Object.assign(doc, newData);
      doc.save(function (err) {
        err ? reject(err) : resolve(doc);
      });
    });
  });
}

const Appointment = mongoose.model('Appointment', AppointmentSchema);

// Mongoose connection setup
const connect = () => {
  console.log("mongo url: " + process.env.MONGO_URL);
  const options = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  }
  mongoose.connect(process.env.MONGO_URL, options)
}

connect();

// Error handler
mongoose.connection.on('error', console.error);

// Reconnect when closed
mongoose.connection.on('disconnected', connect);

// Express setup
const app = express();

// Static files from /src
app.use(express.static(path.resolve(__dirname, '..')));

const handleItemsQuery = (query, res) => {
  query
    .onFulfill(items => {
      return res.json(items);
    })
    .onReject(err => {
      console.error(err);
      return res.status(500).json(err);
    });
};

app.get('/appointments/:year/:month', (req, res) => {
  let { year, month } = req.params;
  handleItemsQuery(Appointment.findByMonth(year, --month), res);
});

app.get('/appointments', (req, res) => {
  const year = moment().year();
  const month = moment().month();
  handleItemsQuery(Appointment.findByMonth(year, month), res);
});

app.get('/appointments/all', (req, res) => {
  handleItemsQuery(Appointment.findAll(), res);
});

app.post('/appointments/:id', jsonParser, (req, res) => {
  Appointment.update(req.params.id, req.body)
  .then(items => res.json(items))
  .catch(err => {
    console.error(err);
    return res.status(500).json(err);
  });
});

// Assume 404 since no middleware responded
app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});

module.exports = app;