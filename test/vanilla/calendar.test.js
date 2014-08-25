var expect = chai.expect;

var TEST_EVENTS = [
  {
    "date":"1/1/2014",
    "time":"3:30:08 AM",
    "title":"ipsa sed aut",
    "description":"nulla aliquid aut consequatur aperiam et minus rerum vero non cupiditate est cupiditate iusto iure"
  },
  {
    "date":"1/1/2014",
    "time":"10:48:45 PM",
    "title":"et ipsam officiis",
    "description":"saepe culpa nihil voluptate aliquam provident possimus magni quia labore cum dignissimos laborum accusamus repellat vero reprehenderit dolore sunt enim magnam"
  },
  {
    "date":"1/10/2014",
    "time":"3:10:16 AM",
    "title":"modi et a",
    "description":"qui eos beatae excepturi corporis esse provident quam iusto qui est earum dolor a et totam ea"
  }
];

var c;

describe("Calendar", function () {
  beforeEach(function () {
    c = new Calendar();
    for (var i = 0; i < TEST_EVENTS.length; i++) {
      c.addEventFromJSON(TEST_EVENTS[i])
    }
  });

  describe("#getHtml()", function () {
    it("Should render table rows for Jan 2014", function () {
      $("#fixtures").append(c.getHtml(0,2014));
      expect($("td.Day").length).to.equal(35);
    });
  });

  after(function () {
    $("#fixtures").empty();
  })
});
