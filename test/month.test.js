var expect = chai.expect;

var m;

describe("Month", function () {
  describe("Constructor", function () {
    context("January 2014 (five weeks)", function () {
      it("Should create a Month with the correct properties", function () {
        m = new Month(0,2014);
        expect(m.daysInMonth).to.equal(31);
        expect(m.weekdayOfFirst).to.equal(3);
        expect(m.precedingDays).to.equal(3);
        expect(m.precedingMonth[0]).to.equal(11);
        expect(m.precedingMonth[1]).to.equal(2013);
        expect(m.trailingDays).to.equal(1);
        expect(m.trailingMonth[0]).to.equal(1);
        expect(m.trailingMonth[1]).to.equal(2014);
        expect(m.days.length).to.equal(35);
      });
    });
    context("March 2014 (six weeks)", function () {
      it("Should create a Month with the correct properties", function () {
        m = new Month(2,2014);
        expect(m.daysInMonth).to.equal(31);
        expect(m.weekdayOfFirst).to.equal(6);
        expect(m.precedingDays).to.equal(6);
        expect(m.precedingMonth[0]).to.equal(1);
        expect(m.precedingMonth[1]).to.equal(2014);
        expect(m.trailingDays).to.equal(5);
        expect(m.trailingMonth[0]).to.equal(3);
        expect(m.trailingMonth[1]).to.equal(2014);
        expect(m.days.length).to.equal(42);
      });
    });
    context("February 2016 (leap year)", function () {
      it("Should create a Month with the correct properties", function () {
        m = new Month(1,2016);
        expect(m.daysInMonth).to.equal(29);
        expect(m.weekdayOfFirst).to.equal(1);
        expect(m.precedingDays).to.equal(1);
        expect(m.precedingMonth[0]).to.equal(0);
        expect(m.precedingMonth[1]).to.equal(2016);
        expect(m.trailingDays).to.equal(5);
        expect(m.trailingMonth[0]).to.equal(2);
        expect(m.trailingMonth[1]).to.equal(2016);
        expect(m.days.length).to.equal(35);
      });
    });
  });

  describe("#getElements()", function () {
    it("Should generate an array of tr, with td, and li elements", function () {
      m = new Month(0,2014);
      var elems = m.getElements();
      expect(elems).to.stasify(function () {
        return true;
      })
    })
  })
});
