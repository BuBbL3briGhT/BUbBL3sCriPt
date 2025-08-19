const assert = require("assert");
const LazyList = require("../src/lazy_list.js");
const List = require("../src/list.js");

describe("LazyList", function () {
  it("is a lazzzy list", function () {
    const expects = [1, 2, 3];
    const itty = expects[Symbol.iterator]();
    const lazy = new LazyList(itty);
    assert.deepEqual(expects, [...lazy]);
  });


  describe("#toList", function () {
    it("renders the lazy list as a list", function () {
      // const lazy = new LazyList([1,2,3][Symbol.iterator]());
      const lazy = new LazyList([1,2,3]);
      const actual = lazy.toList();
      const expected = List.make(1, 2, 3);
      assert.deepEqual(actual, expected);
    });
  });
});

// for(const o of list) {
// }
// const itty = [1, 2, 3];
// const list = new LazyList([1, 2, 3]);
// assert.deepEqual([...lazy
// for(const o of list) {
// }
