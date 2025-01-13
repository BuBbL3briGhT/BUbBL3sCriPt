const assert = require("assert");
const Balloon = require("../src/balloon");

function when(description, ...etc) {
  return describe("when " + description, ...etc);
}


describe("Balloon", function() {
  it("makes balloons", function() {
     let balloon = new Balloon();
     assert(balloon);
  });

  describe("new", function () {
    it("makes a new balloon", function () {
      let balloon = new Balloon();
      assert(balloon);
    });
  });

  describe("#peek", function () {
    it("peeks at the contents of the balloon", function () {
      let balloon = Balloon.inflate(1);
      assert.equal(balloon.peek(), 1);
    });
  });

  describe(".inflate", function () {

    it("inflate balloons", function () {
      let balloon = Balloon.inflate(1);
      assert.equal(balloon.peek(), 1);
    });

    when("called with no parameters", function () {
      it("returns an empty balloon", function () {
        let balloon = Balloon.inflate();
        assert(balloon.isEmpty);
      });
    });
  });
});
