const assert = require("assert");

const List = require("../src/list");
const Ṣymbol = require("../src/symbol");

describe("List", () => {

  describe("#get isEmpty?", function () {

    it("Returns true for an empty list.", function () {
      const list = List.emptyList;
      assert.equal(list["isEmpty?"], true);
    });

    it("Returns false if the list is not empty.", function () {
      const list = List.make(1);
      assert.equal(list["isEmpty?"], false);
    });

  });

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

      list = list.push(2); list = list.map(add7);
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
      assert.equal(list.skip().toString(),
        "(6 7 8)");
      assert.equal(list.skip(0).peek(), 6);
      assert.equal(list.skip(1).peek(), 7);
      assert.equal(list.skip(2).peek(), 8);
      assert.equal(list.skip(3).peek(), undefined);
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

  // describe("contains(value)", function () {
  //   it("returns true if list contains value", function () {
  //     let list = List.make(1, 2, 3);
  //     assert.equal(list.contains(3), true)
  //     assert.equal(list.contains(4), false)
  //   });
  // });

  describe("find(value)", function () {
    it("returns first instance of value if found in list, otherwise undefined", function () {
      let list = List.make(1, 2, 3);
      assert.deepEqual(list.find(1), List.make(1, 2, 3));
      assert.deepEqual(list.find(2), List.make(2, 3));
      assert.deepEqual(list.find(3), List.make(3));
      assert.equal(list.find(4), undefined);
    });
  });

  describe("until(value)", function () {
    it("returns a copy of the list truncated to the item immediatly before the first instance of value", function () {
      let list = List.make(1, 2, 3);
      assert.deepEqual(list.until(2), List.make(1));
      assert.deepEqual(list.until(3), List.make(1, 2));
      assert.deepEqual(list.until(4), list);
    });
  });

  // describe("index(value)", function () {
  //   it("returns index of first instance of value in list, otherwise returns -1", function () {
  //     let list = List.make(1, 2, 3);
  //     assert.equal(list.index(3), 2)
  //     assert.equal(list.index(4), -1)
  //   });
  // });

  describe("split", function () {

    it("should split a list", function () {
      let sAmp = Ṣymbol.for("&");

      let list = List.make(1, 2, 3);
      assert.equal(list.split(Ṣymbol.for("&")).toString(),
        "((1 2 3))");

      list = List.make(1, 2, sAmp, 3);
      assert.equal(list.split(Ṣymbol.for("&")).toString(),
        "((1 2) (3))");

      list = List.make(1, sAmp, 2, sAmp, 3);
      assert.equal(list.split(Ṣymbol.for("&")).toString(),
        "((1) (2) (3))");

      list = List.make(1, 2, 3, sAmp);
      assert.equal(list.split(Ṣymbol.for("&")).toString(),
        "((1 2 3) ())");

      list = List.make(sAmp, 1, 2, 3);
      assert.equal(list.split(Ṣymbol.for("&")).toString(),
        "(() (1 2 3))");

      list = List.make(1, sAmp, sAmp, 2, 3);
      assert.equal(list.split(Ṣymbol.for("&")).toString(),
        "((1) () (2 3))");

      list = List.make(1, sAmp, sAmp, sAmp, 2, 3);
      assert.equal(list.split(Ṣymbol.for("&")).toString(),
        "((1) () () (2 3))");
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

    it("should handle a list created by new List() (yields initial undefined value)", () => {
      // A new List() results in { o: undefined, oo: List.emptyList }, which has isEmpty=false.
      // The iterator will yield the 'o' value.
      const listFromDefaultConstructor = new List();
      const results = [...listFromDefaultConstructor];
      assert.deepEqual(results, [undefined], "Default constructor List should yield its undefined 'o' value");
    });

    it("should yield the single element for a single-element list", () => {
      const list = List.make(1); // Creates list: 1 -> emptyList
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
      const list = List.make(1, 2, 3);

      const expected = [1, 2, 3];

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
      const expected = [1, undefined, 3, null, 5];

      const results = [...list];
      assert.deepEqual(results, expected, "Spread syntax results mismatch for list with null/undefined");
    });

    it("should not modify the original list during iteration", () => {
      const list = List.make("a", "b", "c"); // c -> b -> a
      const expectedItems = ["a", "b", "c"];
      const expectedToString = '("a" "b" "c")'; // Based on typical toString for such a linkedList structure

      // First iteration
      assert.deepEqual([...list], expectedItems, "First iteration results mismatch");

      // Check linkedList integrity after iteration
      assert.equal(list.toString(), expectedToString, "List string form changed after iteration");
      assert.equal(list.count(), 3, "List count changed after iteration");
      assert.equal(list.peek(), "a", "List head changed after iteration");

      // Second iteration
      assert.deepEqual([...list], expectedItems, "Second iteration results mismatch");
    });

    it("should allow multiple iterations independently", () => {
      const list = List.make("x", "y"); // y -> x
      const expected = ["x", "y"];

      const iterator1 = list[Symbol.iterator]();
      const iterator2 = list[Symbol.iterator]();

      assert.deepEqual(iterator1.next().value, "x");
      assert.deepEqual(iterator2.next().value, "x");
      assert.deepEqual(iterator1.next().value, "y");
      assert.deepEqual(iterator2.next().value, "y");
      assert.deepEqual(iterator1.next().done, true);
      assert.deepEqual(iterator2.next().done, true);
    });
  });

  describe("take(n)", function () {
    it("takes a certian number of items fron the list", function () {
      let list = List.make(1, 2, 3);
      let result = list.take();
      assert.equal(result.toString(), "()");
      result = list.take(0);
      assert.equal(result.toString(), "()");
      result = list.take(1);
      assert.equal(result.toString(), "(1)");
      result = list.take(2);
      assert.equal(result.toString(), "(1 2)");
      result = list.take(3);
      assert.equal(result.toString(), "(1 2 3)");
      result = list.take(4);
      assert.equal(result.toString(), "(1 2 3)");
      result = list.take(5);
      assert.equal(result.toString(), "(1 2 3)");
    });
  });

  describe("partition", function () {
     it("partitions a list", function () {
       let list = List.make(1, 2, 3, 4, 5);
       let result = list.partition(2);
       assert.equal(result.toString(),
         "((1 2) (3 4) (5))")
       result = list.partition(3);
       assert.equal(result.toString(),
         "((1 2 3) (4 5))")
     });
  });

  // describe("toObject", function () {
  //   it("convert the list into aa object", function () {
  //     let list = List.make("hello", "hola");
  //     let result = list.toObject();
  //   });
  // });
});
