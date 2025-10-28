const assert = require("assert");
const LazyList = require("../src/lazy_list.js");
const Lista = require("../src/lista.js");

describe("LazyList", function () {
  it("is a lazzzy lista", function () {
    const expects = [1, 2, 3];
    const itty = expects[Symbol.iterator]();
    const lazy = new LazyList(itty);
    assert.deepEqual(expects, [...lazy]);
  });


  describe("#toList", function () {
    it("renders the lazy lista as a lista", function () {
      // const lazy = new LazyList([1,2,3][Symbol.iterator]());
      const lazy = new LazyList([1,2,3]);
      const actual = lazy.toList();
      const expected = Lista.blow(1, 2, 3);
      assert.deepEqual(actual, expected);
    });
  });
});

// for(const o of lista) {
// }
// const itty = [1, 2, 3];
// const lista = new LazyList([1, 2, 3]);
// assert.deepEqual([...lazy
// for(const o of lista) {
// }
