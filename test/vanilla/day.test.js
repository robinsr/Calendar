var expect = chai.expect;


var TEST_EVENTS = [{
    "date":"1/1/2014",
    "time":"3:30:08 AM",
    "title":"ipsa sed aut",
    "description":"nulla aliquid aut consequatur aperiam et minus rerum vero non cupiditate est cupiditate iusto iure"
  }]

var TEST_EVENT_ITEM = new EventItem(TEST_EVENTS[0]);

var INITIALIZED_TEST_ITEMS_ARRAY = [TEST_EVENT_ITEM];

var TEST_DAY = {
  day: 1,
  month: 0,
  year: 2014
}

var EXPECTED_HTML_THIS_MONTH = "<td class=\"this-month Day Day-Wednesday\" "
  + "data-calendar=\"2014-0-1\">"
  + "<div class=\"DateHolder\">1</div>"
  + "<li class=\"calendarItem\" "
  + "onclick=\"calendar.getEventDeatils(34799080133)\">"
  + "ipsa sed aut"
  + "</li>"
  + "</td>";

  var EXPECTED_HTML_OTHER_MONTH = "<td class=\"other-month Day Day-Wednesday\" "
    + "data-calendar=\"2014-0-1\">"
    + "<div class=\"DateHolder\">1</div>"
    + "<li class=\"calendarItem\" "
    + "onclick=\"calendar.getEventDeatils(34799080133)\">"
    + "ipsa sed aut"
    + "</li>"
    + "</td>";

var day;

describe("Day", function () {
  describe("constructor", function () {
    it("should copy the options properties to this", function () {
      day = new Day(TEST_DAY);
      expect(day.year).to.equal(2014);
      expect(day.month).to.equal(0);
      expect(day.day).to.equal(1);
    });
  });

  describe("#getItems()", function () {
    context("Object literal", function () {
      it("Should throw an error", function () {
        expect(day.getItems.bind(day,TEST_EVENTS))
          .to.throw("Error, eventItemsArray contains non EventItems");
      });
    });
    context("EventItem instance",function () {
      it("Should add the item to the instance's daysItem array", function () {
        day.getItems(INITIALIZED_TEST_ITEMS_ARRAY);
        expect(day.daysItems.length).to.equal(1);
      })
    });
  });

  describe("#dayOfWeek()", function () {
    it("Should return the number of the day of the week (0-6)", function () {
      expect(day.dayOfWeek()).to.equal(3);
    });
  });

  describe("#dayOfWeekName()", function () {
    it("Should return the english name of the day of the week", function () {
      expect(day.dayOfWeekName()).to.equal("Wednesday")
    })
  })

  describe("#getElements()", function () {
    context("Generating this month", function () {
      it("Should generate DOM to match the expected", function () {
        expect(day.getElements(0)).to.have.property("nodeName", "TD")
      });
    });
    context("Generating other month", function () {
      it("Should generate DOM to match the expected", function () {
        expect(day.getElements(0)).to.have.property("nodeName", "TD")
      });
    })
  })
});
