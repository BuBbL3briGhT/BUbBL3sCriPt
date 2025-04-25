const assert = require("assert");
const Balloon = require("../src/balloon");

function when(description, ...etc) {
  return describe("when " + description, ...etc);
}
function the(description, body) {
  return it("the " + description, body);
}

describe("Balloon", function() {
  it("makes balloons", function() {
     let balloon = new Balloon();
     assert(balloon);
  });

  describe("new Balloon", function () {
    it("makes a new balloon", function () {
      let balloon = new Balloon();
      assert(balloon);
    });
    the("first value fills the balloon", function () {
      let balloon = new Balloon(3);
      // assert.equal(balloon.filledWith, 3);
      assert.equal(balloon.peek(), 3);
    });
    the("second value becomes the previous balloon in the succession of balloons", function () {
      let balloon1 = new Balloon(4);
      let balloon2 = new Balloon(null,balloon1);
      // assert.equal(balloon2.previousBalloon, balloon1);
      assert.equal(balloon2.pop(), balloon1);
    });

  });

  describe("#peek", function () {
    it("peeks at the contents of the balloon", function () {
      let balloon = Balloon.inflate(1);
      assert.equal(balloon.peek(), 1);
    });
  });


  describe(".toString", function () {
    when("the balloon is empty", function () {
      // it("renders an empty balloon", function () {
      it("renders an undefined", function () {
        // let balloon = Balloon.inflate();
        // assert.equal(balloon.toString(), "[]");
        assert.equal(Balloon.toString(undefined), "[]");
      });
    });
  });


  describe(".inflate", function () {

    it("inflate balloons", function () {
      let balloon = Balloon.inflate(1);
      assert(balloon instanceof Balloon);
      assert(!balloon.isEmpty, "This balloon should not be empty.");
      assert.equal(balloon.peek(), 1);
    });

    when("called with no love", function () {
      it("returns an empty balloon", function () {
        let balloon = Balloon.inflate();
        // assert(balloon.isEmpty);
        assert.equal(balloon, undefined);
      });
    });

  });
});
