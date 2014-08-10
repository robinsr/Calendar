Date.prototype.getDOY = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((this - onejan) / 86400000);
}

function Calendar (calendarSelector, headerSelector) {
  var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

  this._events = [];

  this.addEvent = function(ev){
    this._events.push(ev);
  }

  this.addEventFromJSON = function(ev){
    this._events.push(new EventItem(ev));
  }

  this.getHtml = function (monthNum, yearNum) {
    var relevantEvents = this._events.filter(function (evt) {
      return evt.year == yearNum && evt.month == monthNum;
    });

    var headerHtml = "<table><tr>"
      + "<td class=\"table-header\">Sunday</td>"
      + "<td class=\"table-header\">Monday</td>"
      + "<td class=\"table-header\">Tuesday</td>"
      + "<td class=\"table-header\">Wednesday</td>"
      + "<td class=\"table-header\">Thursday</td>"
      + "<td class=\"table-header\">Friday</td>"
      + "<td class=\"table-header\">Saturday</td>"
      + "</tr>"

    var html = new Month(monthNum, yearNum, relevantEvents).getHTML();

    var closingHtml = "</table>";

    return headerHtml + html + closingHtml;
  }

  this.render = function (monthNum, yearNum){
    $(calendarSelector).empty().append(this.getHtml(monthNum, yearNum));
    $(headerSelector).empty().text(monthNames[monthNum] + ", " + yearNum)
  }

  return this;
}

function Month (monthNum, yearNum, eventItems) {
  this.days = [];

  var eventItems = eventItems || [];

  // determine how many days in this month (special case, February leep year)
  var daysInEachMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (monthNum !== 1) {
    this.daysInMonth = daysInEachMonth[monthNum]
  } else {
    var d = new Date();
    d.setFullYear(yearNum,11,31);
    var totalsDaysThisYear = d.getDOY();
    this.daysInMonth = (totalsDaysThisYear == 365) ? 28 : 29;
  }

  // determine what weekday the first day of the month falls on
  d = new Date(yearNum, monthNum, 1);
  this.weekdayOfFirst = d.getDay();

  // determine number of preceding days to plot on the calendar
  this.precedingDays = this.weekdayOfFirst;

  // determine preceding month (should be array: [month,year])
  this.precedingMonth = monthNum - 1 < 0 ? [11,yearNum - 1] : [monthNum - 1, yearNum];

  // determine number of trailing days to plot on calendar
  var totalDays = this.precedingDays + this.daysInMonth;
  this.trailingDays = 7 - (totalDays % 7);

  // determine trailing month (should be array: [month,year])
  this.trailingMonth = monthNum + 1 == 12 ? [0,yearNum + 1] : [monthNum + 1, yearNum];

  // add preceding days to days array (using splice)
  for (var i = 0; i < this.precedingDays; i++) {
    this.days.splice(0, 0, new Day({
      year: this.precedingMonth[1],
      month: this.precedingMonth[0],
      day: daysInEachMonth[this.precedingMonth[0]] - i
    }));
  }

  // add this months days to the days array (using normal push)
  for (var i = 0; i < this.daysInMonth; i++) {
    this.days.push(new Day({
      year: yearNum,
      month: monthNum,
      day: i + 1
    }));
  }

  // add trailing monds days to the days array
  for (var i = 0; i < this.trailingDays; i++) {
    this.days.push(new Day({
      year: this.trailingMonth[1],
      month: this.trailingMonth[0],
      day: i + 1
    }));
  }

  this.weeksInThisMonth = Math.floor(this.days.length / 7);

  /**
   * getHTML()
   * returns <tr> elements with appropriate content
   */
  this.getHTML = function () {
    var html = "";
    for (var i = 0; i < this.weeksInThisMonth; i++) {
      html += "<tr>";

      var startDate = i * 7;
      var endDate = startDate + 7;

      for (var j = startDate; j < endDate; j++) {
        var currentDay = this.days[j];
        currentDay.getItems(eventItems);
        html += currentDay.getHTML(monthNum)
      }
      html += "</tr>"
    }
    return html;
  }

  return this;
}

function Day (opt) {
  var dayNames = {
      0:'Sunday',
      1:'Monday',
      2:'Tuesday',
      3:'Wednesday',
      4:'Thursday',
      5:'Friday',
      6:'Saturday'
  };

  this.day = opt.day; // 1-31
  this.month = opt.month; // 0-11
  this.year = opt.year; // any four digit year

  // returns 0-6
  this.dayOfWeek = function () {
    var d = new Date(this.year, this.month, this.day, 0, 0, 0, 0);
    return d.getDay();
  }

  // returns "Sunday" = "Saturday"
  this.dayOfWeekName = function () {
    return dayNames[this.dayOfWeek()]
  }

  this.daysItems = [];

  /**
   * getItems
   * Loops over an array of EventItems and adds events with a matching
   * date to this instances daysitems array
   */
  this.getItems = function (eventItemsArray) {
    for (var i = 0; i < eventItemsArray.length; i++) {
      if (eventItemsArray[i] instanceof EventItem){
        if (eventItemsArray[i].year == this.year) {
          if (eventItemsArray[i].month == this.month) {
            if (eventItemsArray[i].day == this.day){
              this.daysItems.push(eventItemsArray[i]);
            }
          }
        }
      } else {
        throw "Error, eventItemsArray contains non EventItems";
      }
    }
  }

  /**
   * visibleDate
   * returns a date string YYYY-MM-DD with 1-indexed months (ie january = 1)
   */
  this.visibleDate = function () {
    return this.year + "-" + (this.month + 1) + "-" + this.day;
  }

  /**
   * dataDate
   reutns a date string YYYY-MM-DD with 0-indexed months
   */
  this.dataDate = function () {
    return this.year + "-" + this.month + "-" + this.day;
  }

  /**
   * getHTML
   * Generates a <td> with appropriate content
   * @param monthNum, the number month being generated
   */
  this.getHTML = function (monthNum) {
    monthNum = monthNum || this.month;

    var monthCssClass = monthNum == this.month ? "this-month" : "other-month";

    var html = "<td class=\""
      + monthCssClass
      + " Day Day-"
      + this.dayOfWeekName()
      + "\" "
      + "data-calendar=\""
      + this.dataDate()
      + "\">"
      + "<div class=\"DateHolder\">"
      + this.day
      + "</div>";

    for (var i = 0; i < this.daysItems.length; i++) {
      html += this.daysItems[i].getHTML();
    }

    html +="</td>";

    return html
  }

  return this;
}

function EventItem (opt) {
  this.date = opt.date;
  this.description = opt.description;
  this.time = opt.time;
  this.title = opt.title;

  var dateSplit = this.date.split("/");

  this.month = parseInt(dateSplit[0]) - 1;
  this.day = parseInt(dateSplit[1]);
  this.year = parseInt(dateSplit[2]);

  this.showEvent = function (){ return }
  this.hideEvent = function (){ return }

  /**
   * getHTML
   * Generates <li> with appropriate content
   */
  this.getHTML = function () {
    return "<li class=\"calendarItem\" onclick=\"calendar.getEventDeatils(34799080133)\">"
    + this.title
    + "</li>"
  }

  return this;
}
