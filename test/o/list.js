const assert = require("assert");
const List  = require("../../src/o/list");

const { make, count, get, invert, map,
  peek, pop, push, reduce, skip, toString
} = List;


describe("List", () => {

describe("emptyList", function () {
  describe("toString", function () {
    it("should return a formatted string representation of an empty list", function () {
      let emptyList = List.emptyList
      assert.equal(emptyList.toString(), "[]");
    });
  });
});

describe("isEmpty", function () {
  it("should return true for an empty list", function () {
    let list = List.make();
    assert.equal(list.isEmpty, true);
  });
  it("should return false for a none empty list", function () {
    let list = List.make(1);
    assert.equal(list.isEmpty, false);
  });
});

describe("toString", function () {
  it("returns the expected string representation", function () {
    let list = List.make(1, 2, 3);
    assert.equal(list.toString(), "[1 2 3]");
  });
});

describe("new List(o, oo) ", () => {
  it("create a new list for your fun and profit.", () => {
    var o;
    o = new List();
    assert.equal(get(o), undefined);
    assert.equal(skip(o, 1), undefined);

    o = new List(1);
    assert.equal(get(o), 1);
    o = new List(2, o);
    assert.equal(get(o), 2);
    assert.equal(get(o,1), 1);
  });
});

describe("make(o...)", () => {
  it("blows lists", () => {
    assert.equal(make(), List.emptyList);
    let o = make(1, 2, 3);
    assert.equal(get(o,0), 3);
    assert.equal(get(o,1), 2);
    assert.equal(get(o,2), 1);
  });
});

describe("count(o)", function () {
  it("counts", function () {
    let o = List.make(1, 2, 3);
    assert.equal(count(o), 3);
  });
});

describe("get(o, index)", () => {
  it("gets value of o at index", () => {
    let o = List.make(6,7,8);
    assert.equal(get(o, 0), 8);
    assert.equal(get(o, 1), 7);
    assert.equal(get(o, 2), 6);
  });
});

describe("invert", () => {
  it("inverts lists", () => {
    var o = List.make();
    o = invert(o);
    assert.equal(o, List.emptyList);

    o = make(1);
    o = invert(o);
    assert.equal(peek(o),1);
    assert.equal(skip(o,1), List.emptyList);

    o = push(push(o,2),3);
    assert.equal(peek(o),3);

    o = invert(o);
    assert.equal(peek(o),1);

    let oo = make(1,2,3);
    assert.equal(List.toString(oo), "[1 2 3]");

    let xo = invert(oo);
    assert.equal(List.toString(xo), "[3 2 1]");
  });
});

describe("map(o, fn)", () => {
  it("maps o through fn", ()=>{
    var o;

    let add7 = (o) => { return o + 7 };

    result = map(o, add7);
    assert.equal(result, undefined);

    o = make(1);
    o = map(o, add7);
    assert.equal(get(o), 8);

    o = push(o, 2);
    o = map(o, add7);
    assert.equal(get(o), 9);
    assert.equal(get(o, 1), 15);

    o = push(o, 3);
    o = map(o, add7);
    assert.equal(get(o), 10);
    assert.equal(get(o, 1), 16);
    assert.equal(get(o, 2), 22);
  });
});

describe("push(o)", () => {
  it("pushes o onto the list stack.", () => {
    var o;

    o = push(o, 1);
    assert.equal(get(o), 1)
    assert.equal(skip(o, 1), undefined);

    o = push(o, 2);
    assert.equal(get(o), 2)
    assert.equal(get(o, 1), 1)
    assert.equal(skip(o, 2), undefined);
  });
});

describe("reduce", () => {
  it("reduces the list", () => {
    var o, result;

    let add = (a,b) => { return b + a };

    result = reduce(o, add);
    assert.equal(result, undefined);

    result = reduce(o, add, 0);
    assert.equal(result, 0);

    o = push(o, 1);
    result = reduce(o, add);
    assert.equal(result, 1);

    o = push(o, 2);
    result = reduce(o, add);
    assert.equal(result, 3);

    o = push(o, 3),
    result = reduce(o, add)
    assert.equal(result, 6)

    o = make("a");
    result = reduce(o, add);
    assert.equal(result, "a");

    o = push(o, "b");
    result = reduce(o, add);
    assert.equal(result, "ab");

    o = push(o, "c");
    result = reduce(o, add);
    assert.equal(result, "abc");
  });
});

describe("skip(list, count)", () => {
  it("skips", () => {
    let o = List.make(6,7,8);
    assert.equal(peek(skip(o)), 8);
    assert.equal(peek(skip(o,0)), 8);
    assert.equal(peek(skip(o,1)), 7);
    assert.equal(peek(skip(o,2)), 6);
  });
});

describe("toString(o)", () => {
  it("formats list as a string.", () => {
    var o, result;

    result = toString(o);
    assert.equal(result, "[]");

    o = make(1);
    result = toString(o);
    assert.equal(result, "[1]");

    o = push(o,2);
    result = toString(o);
    assert.equal(result, "[1 2]");

    o = push(o, 3);
    result = toString(o);
    assert.equal(result, "[1 2 3]");

    o = push(o, "string");
    result = toString(o);
    assert.equal(result, "[1 2 3 \"string\"]");

    o = push(o, Symbol.for("symbol"));
    result = toString(o);
    assert.equal(result, "[1 2 3 \"string\" symbol]");

    let ts = toString;
    let oo = make(3,2,1);
    assert.equal(ts(oo), "[3 2 1]");

    o = push(pop(pop(o)), oo);
    assert.equal(ts(o), "[1 2 3 [3 2 1]]");
  });
});

describe("Symbol.iterator", () => {
  it("should not yield any values for an empty list (List.air)", () => {
    const emptyList = List.emptyList;
    const results = [...emptyList];
    assert.deepEqual(results, []);

    let count = 0;
    for (const item of emptyList) {
      count++;
    }
    assert.equal(count, 0, "for...of loop should not execute for List.air");
  });

  it("should handle a list created by new List() (yields initial undefined value)", () => {
    // A new List() results in { o: undefined, oo: undefined }, which has x=false.
    // The iterator will yield the 'o' value.
    const listFromDefaultConstructor = new List();
    const results = [...listFromDefaultConstructor];
    assert.deepEqual(results, [undefined], "Default constructor list should yield its undefined 'o' value");
  });

  it("should yield the single element for a single-element list", () => {
    const list = List.make(1); // Creates list: 1 -> air
    const expected = [1];

    const resultsForOf = [];
    for (const item of list) {
      resultsForOf.push(item);
    }
    assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch");

    const resultsSpread = [...list];
    assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch");
  });

  it("should yield all elements in a multi-element list in order", () => {
    const list = List.make(1, 2, 3); // Creates list: 1 -> 2 -> 3 -> air
                                         // Note: List.make actually creates it as 3 -> 2 -> 1 -> air
                                         // The tests for make() show: make(1,2,3) -> get(o,0)=3, get(o,1)=2, get(o,2)=1
                                         // So the yielded order should be 3, 2, 1 for make(1,2,3)
    const expected = [3, 2, 1];

    const resultsForOf = [];
    for (const item of list) {
      resultsForOf.push(item);
    }
    assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch for multi-element list");

    const resultsSpread = [...list];
    assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch for multi-element list");
  });

  it("should correctly yield null and undefined values if they are part of the list", () => {
    const list = List.make(1, undefined, 3, null, 5); // Expected order: 5, null, 3, undefined, 1
    const expected = [5, null, 3, undefined, 1];

    const results = [...list];
    assert.deepEqual(results, expected, "Spread syntax results mismatch for list with null/undefined");
  });

  it("should not modify the original list during iteration", () => {
    const list = List.make("a", "b", "c"); // c -> b -> a
    const expectedItems = ["c", "b", "a"];
    const expectedToString = '["a" "b" "c"]'; // Based on typical toString for such a list structure

    // First iteration
    assert.deepEqual([...list], expectedItems, "First iteration results mismatch");

    // Check list integrity after iteration
    assert.equal(List.toString(list), expectedToString, "List string form changed after iteration");
    assert.equal(List.count(list), 3, "List count changed after iteration");
    assert.equal(List.peek(list), "c", "List head changed after iteration");

    // Second iteration
    assert.deepEqual([...list], expectedItems, "Second iteration results mismatch");
  });

  it("should allow multiple iterations independently", () => {
    const list = List.make("x", "y"); // y -> x
    const expected = ["y", "x"];

    const iterator1 = list[Symbol.iterator]();
    const iterator2 = list[Symbol.iterator]();

    assert.deepEqual(iterator1.next().value, "y");
    assert.deepEqual(iterator2.next().value, "y");
    assert.deepEqual(iterator1.next().value, "x");
    assert.deepEqual(iterator2.next().value, "x");
    assert.deepEqual(iterator1.next().done, true);
    assert.deepEqual(iterator2.next().done, true);
  });
});
});
