var items = require('./items.json');
var fs = require('fs');
var moment = require('moment');

items = items.map(item => {
  const { date, time, title, description } = item;
  return {
    title,
    description,
    datetime: {
      $date: moment(`${date} ${time}`, 'M/D/YYYY h:mm:ss A').toDate()
    }
  }
});

fs.writeFile('./new-data.json', JSON.stringify(items, null, '  '), (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
})
