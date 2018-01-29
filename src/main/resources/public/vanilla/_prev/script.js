Date.prototype.getDOY = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((this - onejan) / 86400000);
}

function Calendar (calendarSelector, headerSelector) {
  this.currentMonth = 0;
  this.currentYear = 0;

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

  this.addEvent = function (ev) {
    this._events.push(ev);
  }

  this.addEventFromJSON = function (ev) {
    this._events.push(new EventItem(ev));
  }

  this.removeEventFromJSON = function (a) {
    var eventToRemove = this._events.filter(function (b) {
      return a.date == b.date && a.description == b.description
      && a.title == b.title && a.time == b.time
    });
    this._events.splice(this._events.indexOf(eventToRemove[0]),1);
  }

  this.attachEvents = function (elem) {
    var self = this;

    elem.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    elem.addEventListener("dragenter", function (e) {
      e.preventDefault();
    });

    elem.addEventListener("drop", function (e) {
      var newItem = JSON.parse(e.dataTransfer.getData("Calendar"));
      self.removeEventFromJSON(newItem);
      var newDate = e.target.getAttribute("data-calendar");
      newItem.date = newDate;
      self.addEventFromJSON(newItem);
      self.render(self.currentMonth, self.currentYear);
    });

    return elem
  }

  this.getElements = function (monthNum, yearNum) {
    var self = this;

    var relevantEvents = this._events.filter(function (evt) {
      return evt.year == yearNum && evt.month == monthNum;
    });

    var dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ]

    var table = document.createElement("table");
    var tr = document.createElement("tr");

    for (var i = 0; i < dayNames.length; i++) {
      var td = document.createElement("td");
      td.className = "table-header";
      td.appendChild(document.createTextNode(dayNames[i]))
    }

    table.appendChild(tr);

    var rows = new Month(monthNum, yearNum, relevantEvents).getElements();

    for (var i = 0; i < rows.length; i++) {
      table.appendChild(rows[i])
    }

    table = this.attachEvents(table);

    return table
  }

  this.render = function (monthNum, yearNum){
    $(calendarSelector).empty().append(this.getElements(monthNum, yearNum));
    $(headerSelector).empty().text(monthNames[monthNum] + ", " + yearNum);
    this.currentMonth = monthNum;
    this.currentYear = yearNum;
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
   * getElements()
   * returns <tr> elements with appropriate content
   */

  this.getElements = function () {
    var elems = [];
    for (var i = 0; i < this.weeksInThisMonth; i++) {
      var tr = document.createElement("tr");

      var startDate = i * 7;
      var endDate = startDate + 7;

      for (var j = startDate; j < endDate; j++) {
        var currentDay = this.days[j];
        currentDay.getItems(eventItems);
        tr.appendChild(currentDay.getElements(monthNum))
      }

      elems.push(tr);
    }

    return elems;
  }

  return this;
}

function Day (opt) {
  var dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
  ];

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
    return (this.month + 1) + "/" + this.day + "/" + this.year;
  }

  /**
   * dataDate
   reutns a date string YYYY-MM-DD with 0-indexed months
   */
  this.dataDate = function () {
    return this.year + "-" + this.month + "-" + this.day;
  }

  /**
   * getElements
   * retuns td element with date holder div and li of items
   */
  this.getElements = function (monthNum) {
    monthNum = monthNum || this.month;
    var elem = document.createElement("td");
        elem.classList.add(monthNum == this.month ? "this-month" : "other-month");
        elem.classList.add("Day");
        elem.classList.add("Day-"+this.dayOfWeekName());
        elem.setAttribute("data-calendar", this.visibleDate());

    var dateHolder = document.createElement("div");
        dateHolder.appendChild(document.createTextNode(this.day))

    elem.appendChild(dateHolder);

   for (var i = 0; i < this.daysItems.length; i++) {
     elem.appendChild(this.daysItems[i].getElements());
   }

   return elem;
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

  this.showEvent = function (){
      var elem = document.getElementById('eventDetails');
      elem.innerHTML = "";
      var newHTML = "";

      var displayProperties = ["title","date","time","description"]
      for (var i = 0; i < displayProperties.length; i++) {
        newHTML += "<p class='eventDetailsItem'>"+displayProperties[i]+":</p> "
        + this[displayProperties[i]]+"<br />";
      }
      elem.innerHTML = newHTML;
      elem.innerHTML += "<div class='closeModal'><p>click here to close</p></div>";
      $.fancybox({
        content: $('#eventDetails'),
        modal: true,
        hideOnContentClick: true,
        showCloseButton: true
      });

      $("#eventDetails").click(function(){
        $.fancybox.close();
      });
  }

  /**
   * getElements
   * Creates <li> element
   */
  this.getElements = function () {
    var self = this;

    var li = document.createElement("li");
    li.className = "calendarItem"
    li.innerText = this.title;
    li.setAttribute("draggable", true);

    //TODO: support element.attachEvent();
    li.addEventListener("click", function (e) {
      self.showEvent();
    });

    li.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("calendar", JSON.stringify(self));
    });


    return li
  }

  return this;
}
