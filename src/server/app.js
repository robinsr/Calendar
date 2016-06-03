const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const path = require('path');
const jsonParser = require('body-parser').json();

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
    return moment(this.datetime).format('M/D/YYYY');
  });

AppointmentSchema.virtual('time')
  .get(function() {
    return moment(this.datetime).format('h:mm:ss A');
  });

AppointmentSchema.pre('save', function(next) {
  const { date, time } = this;
  this.datetime = moment(`${date} ${time}`, 'M/D/YYYY h:mm:ss A').toDate();
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
  const { year, month } = req.params;
  handleItemsQuery(Appointment.findByMonth(year, month), res);
});

app.get('/appointments', (req, res) => {
  const year = moment().year();
  const month = moment().month();
  handleItemsQuery(Appointment.findByMonth(year, month), res);
});

app.get('/appointments/all', (req, res) => {
  handleItemsQuery(Appointment.findAll(), res);
});

app.put('/appointments/:id', jsonParser, (req, res) => {
  const query = { _id: req.params.id };
  const opts = { runValidators: true };
  handleItemsQuery(Appointment.findOneAndUpdate(query, req.body, opts).then(), res);
});

// Assume 404 since no middleware responded
app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});

module.exports = app;