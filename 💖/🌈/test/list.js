const assert = require("assert");
const List = require("../src/list");

describe("List", function() {
  it("can do it!", function () {
    let list = new List ();
    assert(list);
  });

  describe("#peek", function () {
    it("returns the last value in the list", function () {
      let list = List.make(1, 2, 3)
      assert.equal(list.peek(), 3);
    });
  });
});
