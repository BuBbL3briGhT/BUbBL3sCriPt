const assert = require("assert");
const Balloon = require("../src/balloon");

describe("Balloon", function() {
  it("makes balloons", function() {
     let balloon = new Balloon();
     assert(balloon);
  });

  describe("new", function () {
    it("make a new balloon", function () {
      let balloon = new Balloon();
      assert(balloon);
    });
  });
});
