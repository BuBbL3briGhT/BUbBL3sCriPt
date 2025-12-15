const assert = require("assert");
const Ditz = require("../src/ditz.js");
const List = require("../src/list.js");

describe("Ditz", function () {
  it("is a lazzzy list", function () {
    const expects = [1, 2, 3];
    const itty = expects[Symbol.iterator]();
    const lazy = new Ditz(itty);
    assert.deepEqual(expects, [...lazy]);
  });


  describe("#toList", function () {
    it("renders the lazy list as a list", function () {
      // const lazy = new Ditz([1,2,3][Symbol.iterator]());
      const lazy = new Ditz([1,2,3]);
      const actual = lazy.toList();
      const expected = List.blow(1, 2, 3);
      assert.deepEqual(actual, expected);
    });
  });
});

// for(const o of list) {
// }
// const itty = [1, 2, 3];
// const list = new Ditz([1, 2, 3]);
// assert.deepEqual([...lazy
// for(const o of list) {
// }
