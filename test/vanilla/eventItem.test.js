var expect = chai.expect;


var TEST_EVENT = {
    "date":"1/1/2014",
    "time":"3:30:08 AM",
    "title":"ipsa sed aut",
    "description":"nulla aliquid aut consequatur aperiam et minus rerum vero non cupiditate est cupiditate iusto iure"
  }

var TEST_HTML = "<li class=\"calendarItem\" onclick=\"calendar.getEventDeatils(34799080133)\">ipsa sed aut</li>"

var ev;

describe("EventItem", function () {
  describe("constructor", function () {
    it("should split the date into year, month, and day properties", function () {
      ev = new EventItem(TEST_EVENT);
      expect(ev.year).to.equal(2014);
      expect(ev.month).to.equal(0);
      expect(ev.day).to.equal(1);
    });
  });


  describe("#getElements()", function () {
    it("Shouls return a li DOM element", function () {
      var li = ev.getElements();
      expect(li).to.have.property("nodeName","LI");

      // $(li).trigger("click");
      //
      // expect(li.classList).to.include.members(["calendarItem","clicked"]);
    })
  })
});
