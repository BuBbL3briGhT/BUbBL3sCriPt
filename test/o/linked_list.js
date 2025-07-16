const assert = require("assert");
const LinkedList  = require("../../src/o/linked_list");

describe("LinkedList", () => {

describe("empty", function () {
  describe("toString", function () {
    it("should return a formatted string representation of an empty linkedList", function () {
      let emptyLinkedList = LinkedList.empty
      assert.equal(emptyLinkedList.toString(), "");
    });
  });
});

describe("isEmpty", function () {
  it("should return true for an empty linkedList", function () {
    let linkedList = LinkedList.make();
    assert.equal(linkedList.isEmpty, true);
  });
  it("should return false for a none empty linkedList", function () {
    let linkedList = LinkedList.make(1);
    assert.equal(linkedList.isEmpty, false);
  });
});

describe("toString", function () {
  it("returns the expected string representation", function () {
    let linkedList = LinkedList.make(1, 2, 3);
    assert.equal(linkedList.toString(), "1 2 3");
  });
});

describe("new LinkedList(o, oo) ", () => {
  it("create a new linkedList for your fun and profit.", () => {
    var o;
    o = new LinkedList();
    assert.equal(o.get(), undefined);
    assert.equal(o.skip(1), LinkedList.emptyLinkedList);

    o = new LinkedList(1);
    assert.equal(o.get(), 1);
    o = new LinkedList(2, o);
    assert.equal(o.get(), 2);
    assert.equal(o.get(1), 1);
  });
});

describe("make(o...)", () => {
  it("blows linkedLists", () => {
    assert.equal(LinkedList.make(), LinkedList.empty);
    let o = LinkedList.make(1, 2, 3);
    assert.equal(o.get(0), 3);
    assert.equal(o.get(1), 2);
    assert.equal(o.get(2), 1);
  });
});

describe("count(o)", function () {
  it("counts", function () {
    let o = LinkedList.make(1, 2, 3);
    assert.equal(o.count(), 3);
  });
});

describe("get(o, index)", () => {
  it("gets value of o at index", () => {
    let o = LinkedList.make(6,7,8);
    assert.equal(o.get(0), 8);
    assert.equal(o.get(1), 7);
    assert.equal(o.get(2), 6);
  });
});

describe("invert", () => {
  it("inverts linkedLists", () => {
    var o = LinkedList.make();
    o = o.invert();
    assert.equal(o, LinkedList.empty);

    o = LinkedList.make(1);
    o = o.invert();
    assert.equal(o.peek(),1);
    assert.equal(o.skip(1), LinkedList.empty);

    o = push(o.push(2),3);
    assert.equal(o.peek(),3);

    o = o.invert();
    assert.equal(o.peek(),1);

    let oo = LinkedList.make(1,2,3);
    assert.equal(oo.toString(), "1 2 3");

    let xo = oo.invert();
    assert.equal(xo.toString(), "3 2 1");
  });
});

describe("map(o, fn)", () => {
  it("maps o through fn", ()=>{
    var o = LinkedList.make();

    let add7 = (o) => { return o + 7 };

    result = o.map(add7);
    assert.equal(result, LinkedList.empty);

    o = LinkedList.make(1);
    o = o.map(add7);
    assert.equal(o.get(), 8);

    o = o.push(2);
    o = o.map(add7);
    assert.equal(o.get(), 9);
    assert.equal(o.get(1), 15);

    o = o.push(3);
    o = o.map(add7);
    assert.equal(o.get(), 10);
    assert.equal(o.get(1), 16);
    assert.equal(o.get(2), 22);
  });
});

describe("push(o)", () => {
  it("pushes o onto the linkedList.", () => {
    var o = LinkedList.make();

    o = o.push(1);
    assert.equal(o.get(), 1)
    assert.equal(o.skip(1), LinkedList.empty);

    o = o.push(2);
    assert.equal(o.get(), 2)
    assert.equal(o.get(1), 1)
    assert.equal(o.skip(2), LinkedList.empty);
  });
});

describe("reduce", () => {
  it("reduces the linkedList", () => {
    var o = LinkedList.make(),
        result;

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

describe("skip(linkedList, count)", () => {
  it("skips", () => {
    let o = LinkedList.make(6,7,8);
    assert.equal(peek(skip(o)), 8);
    assert.equal(peek(skip(o,0)), 8);
    assert.equal(peek(skip(o,1)), 7);
    assert.equal(peek(skip(o,2)), 6);
  });
});

describe("toString(o)", () => {
  it("formats linkedList as a string.", () => {
    var o = LinkedList.make(),
      result;

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
  it("should not yield any values for an empty linkedList (LinkedList.air)", () => {
    const emptyLinkedList = LinkedList.emptyLinkedList;
    const results = [...emptyLinkedList];
    assert.deepEqual(results, []);

    let count = 0;
    for (const item of emptyLinkedList) {
      count++;
    }
    assert.equal(count, 0, "for...of loop should not execute for LinkedList.air");
  });

  it("should handle a linkedList created by new LinkedList() (yields initial undefined value)", () => {
    // A new LinkedList() results in { o: undefined, oo: undefined }, which has x=false.
    // The iterator will yield the 'o' value.
    const linkedListFromDefaultConstructor = new LinkedList();
    const results = [...linkedListFromDefaultConstructor];
    assert.deepEqual(results, [undefined], "Default constructor linkedList should yield its undefined 'o' value");
  });

  it("should yield the single element for a single-element linkedList", () => {
    const linkedList = LinkedList.make(1); // Creates linkedList: 1 -> air
    const expected = [1];

    const resultsForOf = [];
    for (const item of linkedList) {
      resultsForOf.push(item);
    }
    assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch");

    const resultsSpread = [...linkedList];
    assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch");
  });

  it("should yield all elements in a multi-element linkedList in order", () => {
    const linkedList = LinkedList.make(1, 2, 3); // Creates linkedList: 1 -> 2 -> 3 -> air
                                         // Note: LinkedList.make actually creates it as 3 -> 2 -> 1 -> air
                                         // The tests for make() show: make(1,2,3) -> get(o,0)=3, get(o,1)=2, get(o,2)=1
                                         // So the yielded order should be 3, 2, 1 for make(1,2,3)
    const expected = [3, 2, 1];

    const resultsForOf = [];
    for (const item of linkedList) {
      resultsForOf.push(item);
    }
    assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch for multi-element linkedList");

    const resultsSpread = [...linkedList];
    assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch for multi-element linkedList");
  });

  it("should correctly yield null and undefined values if they are part of the linkedList", () => {
    const linkedList = LinkedList.make(1, undefined, 3, null, 5); // Expected order: 5, null, 3, undefined, 1
    const expected = [5, null, 3, undefined, 1];

    const results = [...linkedList];
    assert.deepEqual(results, expected, "Spread syntax results mismatch for linkedList with null/undefined");
  });

  it("should not modify the original linkedList during iteration", () => {
    const linkedList = LinkedList.make("a", "b", "c"); // c -> b -> a
    const expectedItems = ["c", "b", "a"];
    const expectedToString = '["a" "b" "c"]'; // Based on typical toString for such a linkedList structure

    // First iteration
    assert.deepEqual([...linkedList], expectedItems, "First iteration results mismatch");

    // Check linkedList integrity after iteration
    assert.equal(LinkedList.toString(linkedList), expectedToString, "LinkedList string form changed after iteration");
    assert.equal(LinkedList.count(linkedList), 3, "LinkedList count changed after iteration");
    assert.equal(LinkedList.peek(linkedList), "c", "LinkedList head changed after iteration");

    // Second iteration
    assert.deepEqual([...linkedList], expectedItems, "Second iteration results mismatch");
  });

  it("should allow multiple iterations independently", () => {
    const linkedList = LinkedList.make("x", "y"); // y -> x
    const expected = ["y", "x"];

    const iterator1 = linkedList[Symbol.iterator]();
    const iterator2 = linkedList[Symbol.iterator]();

    assert.deepEqual(iterator1.next().value, "y");
    assert.deepEqual(iterator2.next().value, "y");
    assert.deepEqual(iterator1.next().value, "x");
    assert.deepEqual(iterator2.next().value, "x");
    assert.deepEqual(iterator1.next().done, true);
    assert.deepEqual(iterator2.next().done, true);
  });
});
});
