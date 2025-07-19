const assert = require("assert");
const List  = require("../../src/o/list");

describe("List", () => {

  describe("emptyList", function () {
    describe("toString", function () {
      it("should return a formatted string representation of an empty linkedList", function () {
        let emptyList = List.emptyList
        assert.equal(emptyList.toString(), "()");
      });
    });
  });

  describe("isEmpty", function () {
    it("should return true for an empty list", function () {
      let list = List.make();
      assert.equal(list.isEmpty, true);
    });
    it("should return false for a none empty linkedList", function () {
      let list = List.make(1);
      assert.equal(list.isEmpty, false);
    });
  });

  describe("toString", function () {
    it("returns the expected string representation", function () {
      let list = List.make(1, 2, 3);
      assert.equal(list.toString(), "(1 2 3)");
    });
  });

  describe("new List(o, oo) ", () => {
    it("create a new list for your fun and profit.", () => {
      var list;
      list = new List();
      assert.equal(list.get(), undefined);
      assert.equal(list.pop(), List.emptyList);

      list = new List(1);
      assert.equal(list.get(), 1);
      list = new List(2, list);
      assert.equal(list.get(), 2);
      assert.equal(list.get(1), 1);
    });
  });

  describe("make(o...)", () => {
    it("makes a list", () => {
      assert.equal(List.make(), List.emptyList);
      let list = List.make(1, 2, 3);
      assert.equal(list.get(0), 1);
      assert.equal(list.get(1), 2);
      assert.equal(list.get(2), 3);
    });
  });

  describe("count(o)", function () {
    it("counts", function () {
      let list = List.make(1, 2, 3);
      assert.equal(list.count(), 3);
    });
  });

  describe("get(index)", () => {
    it("gets value at index", () => {
      let list = List.make(6,7,8);
      assert.equal(list.get(0), 6);
      assert.equal(list.get(1), 7);
      assert.equal(list.get(2), 8);
    });
  });

  describe("invert", () => {
    it("inverts list", () => {
      var list = List.make();
      list = list.invert();
      assert.equal(list, List.emptyList);

      list = List.make(1);
      list = list.invert();
      assert.equal(list.peek(),1);
      assert.equal(list.skip(1), List.emptyList);

      list = list.push(2).push(3);
      assert.equal(list.peek(), 3);

      list = list.invert();
      assert.equal(list.peek(), 1);

      let oo = List.make(1,2,3);
      assert.equal(oo.toString(), "(1 2 3)");

      let xo = oo.invert();
      assert.equal(xo.toString(), "(3 2 1)");
    });
  });

  describe("#map(fn)", () => {
    it("maps through fn", ()=>{
      var list = List.make();

      let add7 = (o) => { return o + 7 };

      result = list.map(add7);
      assert.equal(result, List.emptyList);

      list = List.make(1);
      list = list.map(add7);
      assert.equal(list.get(), 8);

      list = list.push(2);
      list = list.map(add7);
      assert.equal(list.get(), 9);
      assert.equal(list.get(1), 15);

      list = list.push(3);
      list = list.map(add7);
      assert.equal(list.get(), 10);
      assert.equal(list.get(1), 16);
      assert.equal(list.get(2), 22);
    });
  });

  describe("#push(o)", () => {
    it("pushes o onto the List.", () => {
      var list = List.make();

      list = list.push(1);
      assert.equal(list.get(), 1)
      assert.equal(list.skip(1), List.emptyList);

      list = list.push(2);
      assert.equal(list.get(), 2)
      assert.equal(list.get(1), 1)
      assert.equal(list.skip(2), List.emptyList);
    });
  });

  describe("#reduce(fn)", () => {
    it("reduces the list", () => {
      var list = List.make(),
          result;

      let add = (a,b) => { return b + a };

      result = list.reduce(add);
      assert.equal(result, undefined);

      result = list.reduce(add, 0);
      assert.equal(result, 0);

      list = list.push(1);
      result = list.reduce(add);
      assert.equal(result, 1);

      list= list.push(2);
      result = list.reduce(add);
      assert.equal(result, 3);

      list= list.push(3),
      result = list.reduce(add)
      assert.equal(result, 6)

      list= List.make("a");
      result = list.reduce(add);
      assert.equal(result, "a");

      list= list.push("b");
      result = list.reduce(add);
      assert.equal(result, "ab");

      list= list.push("c");
      result = list.reduce(add);
      assert.equal(result, "abc");
    });
  });

  describe("#skip(count)", () => {
    it("skips", () => {
      let list = List.make(6,7,8);
      assert.equal(list.skip().peek(), 6);
      assert.equal(list.skip(0).peek(), 6);
      assert.equal(list.skip(1).peek(), 7);
      assert.equal(list.skip(2).peek(), 8);
    });
  });

  describe("#toString()", () => {
    it("formats list as a string.", () => {
      var list = List.make(),
        result;

      result = list.toString();
      assert.equal(result, "()");

      list = List.make(1);
      result = list.toString();
      assert.equal(result, "(1)");

      list = list.push(2);
      result = list.toString();
      assert.equal(result, "(2 1)");

      list = list.push(3);
      result = list.toString();
      assert.equal(result, "(3 2 1)");

      list = list.push("string");
      result = list.toString();
      assert.equal(result, "(\"string\" 3 2 1)");

      list = list.push(Symbol.for("symbol"));
      result = list.toString();
      assert.equal(result, "(symbol \"string\" 3 2 1)");

      // let ts = toString;
      let oo = List.make(3,2,1);
      assert.equal(oo.toString(), "(3 2 1)");

      // list = push(pop(pop(o)), oo);
      // o = o.pop().pop().push(oo);
      // assert.equal(list.toString(), "(1 2 3 (3 2 1))");
    });
  });

  describe("Symbol.iterator", () => {
    it("should not yield any values for an empty linkedList (LinkedList.air)", () => {
      const emptyList = List.emptyList;
      const results = [...emptyList];
      assert.deepEqual(results, []);

      let count = 0;
      for (const item of emptyList) {
        count++;
      }
      assert.equal(count, 0, "for...of loop should not execute for List.emptyList");
    });

  //   it("should handle a linkedList created by new LinkedList() (yields initial undefined value)", () => {
  //     // A new LinkedList() results in { o: undefined, oo: undefined }, which has x=false.
  //     // The iterator will yield the 'o' value.
  //     const linkedListFromDefaultConstructor = new LinkedList();
  //     const results = [...linkedListFromDefaultConstructor];
  //     assert.deepEqual(results, [undefined], "Default constructor linkedList should yield its undefined 'o' value");
  //   });

  //   it("should yield the single element for a single-element linkedList", () => {
  //     const linkedList = LinkedList.make(1); // Creates linkedList: 1 -> air
  //     const expected = [1];

  //     const resultsForOf = [];
  //     for (const item of linkedList) {
  //       resultsForOf.push(item);
  //     }
  //     assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch");

  //     const resultsSpread = [...linkedList];
  //     assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch");
  //   });

  //   it("should yield all elements in a multi-element linkedList in order", () => {
  //     const linkedList = LinkedList.make(1, 2, 3); // Creates linkedList: 1 -> 2 -> 3 -> air
  //                                          // Note: LinkedList.make actually creates it as 3 -> 2 -> 1 -> air
  //                                          // The tests for make() show: make(1,2,3) -> get(o,0)=3, get(o,1)=2, get(o,2)=1
  //                                          // So the yielded order should be 3, 2, 1 for make(1,2,3)
  //     const expected = [3, 2, 1];

  //     const resultsForOf = [];
  //     for (const item of linkedList) {
  //       resultsForOf.push(item);
  //     }
  //     assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch for multi-element linkedList");

  //     const resultsSpread = [...linkedList];
  //     assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch for multi-element linkedList");
  //   });

  //   it("should correctly yield null and undefined values if they are part of the linkedList", () => {
  //     const linkedList = LinkedList.make(1, undefined, 3, null, 5); // Expected order: 5, null, 3, undefined, 1
  //     const expected = [5, null, 3, undefined, 1];

  //     const results = [...linkedList];
  //     assert.deepEqual(results, expected, "Spread syntax results mismatch for linkedList with null/undefined");
  //   });

  //   it("should not modify the original linkedList during iteration", () => {
  //     const linkedList = LinkedList.make("a", "b", "c"); // c -> b -> a
  //     const expectedItems = ["c", "b", "a"];
  //     const expectedToString = '["a" "b" "c"]'; // Based on typical toString for such a linkedList structure

  //     // First iteration
  //     assert.deepEqual([...linkedList], expectedItems, "First iteration results mismatch");

  //     // Check linkedList integrity after iteration
  //     assert.equal(LinkedList.toString(linkedList), expectedToString, "LinkedList string form changed after iteration");
  //     assert.equal(LinkedList.count(linkedList), 3, "LinkedList count changed after iteration");
  //     assert.equal(LinkedList.peek(linkedList), "c", "LinkedList head changed after iteration");

  //     // Second iteration
  //     assert.deepEqual([...linkedList], expectedItems, "Second iteration results mismatch");
  //   });

  //   it("should allow multiple iterations independently", () => {
  //     const linkedList = LinkedList.make("x", "y"); // y -> x
  //     const expected = ["y", "x"];

  //     const iterator1 = linkedList[Symbol.iterator]();
  //     const iterator2 = linkedList[Symbol.iterator]();

  //     assert.deepEqual(iterator1.next().value, "y");
  //     assert.deepEqual(iterator2.next().value, "y");
  //     assert.deepEqual(iterator1.next().value, "x");
  //     assert.deepEqual(iterator2.next().value, "x");
  //     assert.deepEqual(iterator1.next().done, true);
  //     assert.deepEqual(iterator2.next().done, true);
  //   });
  });
});
