const assert = require("assert");
const { LazyList, List } = require("../fnt/list.js");

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
      const lazyList = new LazyList([1,2,3]);
      const actual = lazyList.toList();
      const expected = List.blow(1, 2, 3);
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
