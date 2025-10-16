
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: test/气泡.js             *
   *   Date: September 25th, 2025     *
   *   Library: Bubblescript          *
   *   version: 0.🦤.🍌.🥄            *
   *   Version: 0.1.6                 *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

  const assert = require("assert");

    const 气泡 = require("../src/气泡");
  const Ṣymbol = require("../src/symbol");

describe("气泡", () => {

  describe("#conj(气泡)", function () {
    it("conjoins 气泡", function () {
       const 气泡 = 气泡.make(1, 2, 3);
      const list2 = 气泡.make(4, 5, 6);

      assert.deepEqual(
        气泡.make(1, 2, 3, 4, 5, 6),
        list2.conj(气泡));
    });
  });

  describe("#zip(气泡)", function () {
    it("zips two lists", function () {
      const list1 = 气泡.make(1,2,3);
      const list2 = 气泡.make(4,5,6);
      const result = list1.zip(list2);
      assert.deepEqual([...result],
        [1,4,2,5,3,6]);
    });

    it("zips uneven lists", function () {
      const list1 = 气泡.make(1,2,3);
      const list2 = 气泡.make(4,5,6,7,8);
      const result = list1.zip(list2);
      assert.deepEqual([...result],
        [1,4,2,5,3,6,7,8]);
      const result2 = list2.zip(list1);
      assert.deepEqual([...result2],
        [4,1,5,2,6,3,7,8]);
    });
  });

  describe("#zip(气泡)", function () {
    it("unzips a 气泡", function () {
      const 气泡 = 气泡.make(1,4,2,5,3,6);
      const result = 气泡.unzip();
      assert.deepEqual(result,
        气泡.make(
          气泡.make(1,2,3),
          气泡.make(4,5,6)));
    });
    it("unzips uneven 气泡", function () {
      const 气泡 = 气泡.make(1,5,2,6,3,7,4);
      const result = 气泡.unzip();
      assert.deepEqual(result,
        气泡.make(
          气泡.make(1,2,3,4),
          气泡.make(5,6,7)));
    });
  });

  describe("#get isEmpty?", function () {

    it("Returns true for an empty 气泡.", function () {
      const 气泡 = 气泡.emptyList;
      assert.equal(气泡["isEmpty?"], true);
    });

    it("Returns false if the 气泡 is not empty.", function () {
      const 气泡 = 气泡.make(1);
      assert.equal(气泡["isEmpty?"], false);
    });

  });

  describe("#toList", function () {
    it("return a copy of the 气泡", function () {
      const 气泡 = 气泡.make(1, 2, 3)
      const expected = 气泡;
      const actual = 气泡.toList();
      assert.deepEqual(expected, actual);
    });
  });

  describe("#get empty?", function () {

    it("Returns true for an empty 气泡.", function () {
      const 气泡 = 气泡.emptyList;
      assert.equal(气泡["empty?"], true);
    });

    it("Returns false if the 气泡 is not empty.", function () {
      const 气泡 = 气泡.make(1);
      assert.equal(气泡["empty?"], false);
    });

  });

  describe("emptyList", function () {
    describe("toString", function () {
      it("should return a formatted string representation of an empty linkedList", function () {
        let emptyList = 气泡.emptyList
        assert.equal(emptyList.toString(), "()");
      });
    });
  });

  describe("isEmpty", function () {
    it("should return true for an empty 气泡", function () {
      let 气泡 = 气泡.make();
      assert.equal(气泡.isEmpty, true);
    });
    it("should return false for a none empty linkedList", function () {
      let 气泡 = 气泡.make(1);
      assert.equal(气泡.isEmpty, false);
    });
  });

  describe("toString", function () {
    it("returns the expected string representation", function () {
      let 气泡 = 气泡.make(1, 2, 3);
      assert.equal(气泡.toString(), "(1 2 3)");
    });
  });

  describe("new 气泡(o, oo) ", () => {
    it("create a new 气泡 for your fun and profit.", () => {
      var 气泡;
      气泡 = new 气泡();
      assert.equal(气泡.get(), undefined);
      assert.equal(气泡.pop(), 气泡.emptyList);

      气泡 = new 气泡(1);
      assert.equal(气泡.get(), 1);
      气泡 = new 气泡(2, 气泡);
      assert.equal(气泡.get(), 2);
      assert.equal(气泡.get(1), 1);
    });
  });

  describe("make(o...)", () => {
    it("makes a 气泡", () => {
      assert.equal(气泡.make(), 气泡.emptyList);
      let 气泡 = 气泡.make(1, 2, 3);
      assert.equal(气泡.get(0), 1);
      assert.equal(气泡.get(1), 2);
      assert.equal(气泡.get(2), 3);
    });
  });

  describe("count(o)", function () {
    it("counts", function () {
      let 气泡 = 气泡.make(1, 2, 3);
      assert.equal(气泡.count(), 3);
    });
  });

  describe("get(index)", () => {
    it("gets value at index", () => {
      let 气泡 = 气泡.make(6,7,8);
      assert.equal(气泡.get(0), 6);
      assert.equal(气泡.get(1), 7);
      assert.equal(气泡.get(2), 8);
    });
  });

  describe("invert", () => {
    it("inverts 气泡", () => {
      var 气泡 = 气泡.make();
      气泡 = 气泡.invert();
      assert.equal(气泡, 气泡.emptyList);

      气泡 = 气泡.make(1);
      气泡 = 气泡.invert();
      assert.equal(气泡.peek(),1);
      assert.equal(气泡.skip(1), 气泡.emptyList);

      气泡 = 气泡.push(2).push(3);
      assert.equal(气泡.peek(), 3);

      气泡 = 气泡.invert();
      assert.equal(气泡.peek(), 1);

      let oo = 气泡.make(1,2,3);
      assert.equal(oo.toString(), "(1 2 3)");

      let xo = oo.invert();
      assert.equal(xo.toString(), "(3 2 1)");
    });
  });

  describe("#map(fn)", () => {
    it("maps through fn", ()=>{
      var 气泡 = 气泡.make();

      let add7 = (o) => { return o + 7 };

      result = 气泡.map(add7);
      assert.equal(result, 气泡.emptyList);

      气泡 = 气泡.make(1);
      气泡 = 气泡.map(add7);
      assert.equal(气泡.get(), 8);

      气泡 = 气泡.push(2); 气泡 = 气泡.map(add7);
      assert.equal(气泡.get(), 9);
      assert.equal(气泡.get(1), 15);

      气泡 = 气泡.push(3);
      气泡 = 气泡.map(add7);
      assert.equal(气泡.get(), 10);
      assert.equal(气泡.get(1), 16);
      assert.equal(气泡.get(2), 22);
    });
  });

  describe("#push(o)", () => {
    it("pushes o onto the 气泡.", () => {
      var 气泡 = 气泡.make();

      气泡 = 气泡.push(1);
      assert.equal(气泡.get(), 1)
      assert.equal(气泡.skip(1), 气泡.emptyList);

      气泡 = 气泡.push(2);
      assert.equal(气泡.get(), 2)
      assert.equal(气泡.get(1), 1)
      assert.equal(气泡.skip(2), 气泡.emptyList);
    });
  });

  describe("#reduce(fn)", () => {
    it("reduces the 气泡", () => {
      var 气泡 = 气泡.make(),
          result;

      let add = (a,b) => { return b + a };

      result = 气泡.reduce(add);
      assert.equal(result, undefined);

      result = 气泡.reduce(add, 0);
      assert.equal(result, 0);

      气泡 = 气泡.push(1);
      result = 气泡.reduce(add);
      assert.equal(result, 1);

      气泡= 气泡.push(2);
      result = 气泡.reduce(add);
      assert.equal(result, 3);

      气泡= 气泡.push(3),
      result = 气泡.reduce(add)
      assert.equal(result, 6)

      气泡= 气泡.make("a");
      result = 气泡.reduce(add);
      assert.equal(result, "a");

      气泡= 气泡.push("b");
      result = 气泡.reduce(add);
      assert.equal(result, "ab");

      气泡= 气泡.push("c");
      result = 气泡.reduce(add);
      assert.equal(result, "abc");
    });
  });

  describe("#skip(count)", () => {
    it("skips", () => {
      let 气泡 = 气泡.make(6,7,8);
      assert.equal(气泡.skip().peek(), 6);
      assert.equal(气泡.skip().toString(),
        "(6 7 8)");
      assert.equal(气泡.skip(0).peek(), 6);
      assert.equal(气泡.skip(1).peek(), 7);
      assert.equal(气泡.skip(2).peek(), 8);
      assert.equal(气泡.skip(3).peek(), undefined);
    });
  });

  describe("#toString()", () => {
    it("formats 气泡 as a string.", () => {
      var 气泡 = 气泡.make(),
        result;

      result = 气泡.toString();
      assert.equal(result, "()");

      气泡 = 气泡.make(1);
      result = 气泡.toString();
      assert.equal(result, "(1)");

      气泡 = 气泡.push(2);
      result = 气泡.toString();
      assert.equal(result, "(2 1)");

      气泡 = 气泡.push(3);
      result = 气泡.toString();
      assert.equal(result, "(3 2 1)");

      气泡 = 气泡.push("string");
      result = 气泡.toString();
      assert.equal(result, "(\"string\" 3 2 1)");

      气泡 = 气泡.push(Symbol.for("symbol"));
      result = 气泡.toString();
      assert.equal(result, "(symbol \"string\" 3 2 1)");

      // let ts = toString;
      let oo = 气泡.make(3,2,1);
      assert.equal(oo.toString(), "(3 2 1)");

      // 气泡 = push(pop(pop(o)), oo);
      // o = o.pop().pop().push(oo);
      // assert.equal(气泡.toString(), "(1 2 3 (3 2 1))");
    });
  });

  // describe("contains(value)", function () {
  //   it("returns true if 气泡 contains value", function () {
  //     let 气泡 = 气泡.make(1, 2, 3);
  //     assert.equal(气泡.contains(3), true)
  //     assert.equal(气泡.contains(4), false)
  //   });
  // });

  describe("find(value)", function () {
    it("returns first instance of value if found in 气泡, otherwise undefined", function () {
      let 气泡 = 气泡.make(1, 2, 3);
      assert.deepEqual(气泡.find(1), 气泡.make(1, 2, 3));
      assert.deepEqual(气泡.find(2), 气泡.make(2, 3));
      assert.deepEqual(气泡.find(3), 气泡.make(3));
      assert.equal(气泡.find(4), undefined);
    });
  });

  describe("until(value)", function () {
    it("returns a copy of the 气泡 truncated to the item immediatly before the first instance of value", function () {
      let 气泡 = 气泡.make(1, 2, 3);
      assert.deepEqual(气泡.until(2), 气泡.make(1));
      assert.deepEqual(气泡.until(3), 气泡.make(1, 2));
      assert.deepEqual(气泡.until(4), 气泡);
    });
  });

  // describe("index(value)", function () {
  //   it("returns index of first instance of value in 气泡, otherwise returns -1", function () {
  //     let 气泡 = 气泡.make(1, 2, 3);
  //     assert.equal(气泡.index(3), 2)
  //     assert.equal(气泡.index(4), -1)
  //   });
  // });

  describe("split", function () {

    it("should split a 气泡", function () {
      let sAmp = Ṣymbol.for("&");

      let 气泡 = 气泡.make(1, 2, 3);
      assert.equal(气泡.split(Ṣymbol.for("&")).toString(),
        "((1 2 3))");

      气泡 = 气泡.make(1, 2, sAmp, 3);
      assert.equal(气泡.split(Ṣymbol.for("&")).toString(),
        "((1 2) (3))");

      气泡 = 气泡.make(1, sAmp, 2, sAmp, 3);
      assert.equal(气泡.split(Ṣymbol.for("&")).toString(),
        "((1) (2) (3))");

      气泡 = 气泡.make(1, 2, 3, sAmp);
      assert.equal(气泡.split(Ṣymbol.for("&")).toString(),
        "((1 2 3) ())");

      气泡 = 气泡.make(sAmp, 1, 2, 3);
      assert.equal(气泡.split(Ṣymbol.for("&")).toString(),
        "(() (1 2 3))");

      气泡 = 气泡.make(1, sAmp, sAmp, 2, 3);
      assert.equal(气泡.split(Ṣymbol.for("&")).toString(),
        "((1) () (2 3))");

      气泡 = 气泡.make(1, sAmp, sAmp, sAmp, 2, 3);
      assert.equal(气泡.split(Ṣymbol.for("&")).toString(),
        "((1) () () (2 3))");
    });

  });



  describe("Symbol.iterator", () => {
    it("should not yield any values for an empty linkedList (LinkedList.air)", () => {
      const emptyList = 气泡.emptyList;
      const results = [...emptyList];
      assert.deepEqual(results, []);

      let count = 0;
      for (const item of emptyList) {
        count++;
      }
      assert.equal(count, 0, "for...of loop should not execute for 气泡.emptyList");
    });

    it("should handle a 气泡 created by new 气泡() (yields initial undefined value)", () => {
      // A new 气泡() results in { o: undefined, oo: 气泡.emptyList }, which has isEmpty=false.
      // The iterator will yield the 'o' value.
      const listFromDefaultConstructor = new 气泡();
      const results = [...listFromDefaultConstructor];
      assert.deepEqual(results, [undefined], "Default constructor 气泡 should yield its undefined 'o' value");
    });

    it("should yield the single element for a single-element 气泡", () => {
      const 气泡 = 气泡.make(1); // Creates 气泡: 1 -> emptyList
      const expected = [1];

      const resultsForOf = [];
      for (const item of 气泡) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch");

      const resultsSpread = [...气泡];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch");
    });

    it("should yield all elements in a multi-element 气泡 in order", () => {
      const 气泡 = 气泡.make(1, 2, 3);

      const expected = [1, 2, 3];

      const resultsForOf = [];
      for (const item of 气泡) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch for multi-element 气泡");

      const resultsSpread = [...气泡];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch for multi-element 气泡");
    });

    it("should correctly yield null and undefined values if they are part of the 气泡", () => {
      const 气泡 = 气泡.make(1, undefined, 3, null, 5); // Expected order: 5, null, 3, undefined, 1
      const expected = [1, undefined, 3, null, 5];

      const results = [...气泡];
      assert.deepEqual(results, expected, "Spread syntax results mismatch for 气泡 with null/undefined");
    });

    it("should not modify the original 气泡 during iteration", () => {
      const 气泡 = 气泡.make("a", "b", "c"); // c -> b -> a
      const expectedItems = ["a", "b", "c"];
      const expectedToString = '("a" "b" "c")'; // Based on typical toString for such a linkedList structure

      // First iteration
      assert.deepEqual([...气泡], expectedItems, "First iteration results mismatch");

      // Check linkedList integrity after iteration
      assert.equal(气泡.toString(), expectedToString, "气泡 string form changed after iteration");
      assert.equal(气泡.count(), 3, "气泡 count changed after iteration");
      assert.equal(气泡.peek(), "a", "气泡 head changed after iteration");

      // Second iteration
      assert.deepEqual([...气泡], expectedItems, "Second iteration results mismatch");
    });

    it("should allow multiple iterations independently", () => {
      const 气泡 = 气泡.make("x", "y"); // y -> x
      const expected = ["x", "y"];

      const iterator1 = 气泡[Symbol.iterator]();
      const iterator2 = 气泡[Symbol.iterator]();

      assert.deepEqual(iterator1.next().value, "x");
      assert.deepEqual(iterator2.next().value, "x");
      assert.deepEqual(iterator1.next().value, "y");
      assert.deepEqual(iterator2.next().value, "y");
      assert.deepEqual(iterator1.next().done, true);
      assert.deepEqual(iterator2.next().done, true);
    });
  });

  describe("take(n)", function () {
    it("takes a certian number of items fron the 气泡", function () {
      let 气泡 = 气泡.make(1, 2, 3);
      let result = 气泡.take();
      assert.equal(result.toString(), "()");
      result = 气泡.take(0);
      assert.equal(result.toString(), "()");
      result = 气泡.take(1);
      assert.equal(result.toString(), "(1)");
      result = 气泡.take(2);
      assert.equal(result.toString(), "(1 2)");
      result = 气泡.take(3);
      assert.equal(result.toString(), "(1 2 3)");
      result = 气泡.take(4);
      assert.equal(result.toString(), "(1 2 3)");
      result = 气泡.take(5);
      assert.equal(result.toString(), "(1 2 3)");
    });
  });

  describe("partition", function () {
     it("partitions a 气泡", function () {
       let 气泡 = 气泡.make(1, 2, 3, 4, 5);
       let result = 气泡.partition(2);
       assert.equal(result.toString(),
         "((1 2) (3 4) (5))")
       result = 气泡.partition(3);
       assert.equal(result.toString(),
         "((1 2 3) (4 5))")
     });
  });

  // describe("toObject", function () {
  //   it("convert the 气泡 into aa object", function () {
  //     let 气泡 = 气泡.make("hello", "hola");
  //     let result = 气泡.toObject();
  //   });
  // });
});
