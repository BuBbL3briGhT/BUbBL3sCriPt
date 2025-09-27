
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: test/列表.js             *
   *   Date: September 25th, 2025     *
   *   Library: Bubblescript          *
   *   version: 0.🦤.🍌.🥄            *
   *   Version: 0.1.6                 *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

  const assert = require("assert");

    const 列表 = require("../src/列表");
  const Ṣymbol = require("../src/symbol");

describe("列表", () => {

  describe("#conj(列表)", function () {
    it("conjoins 列表", function () {
       const 列表 = 列表.make(1, 2, 3);
      const list2 = 列表.make(4, 5, 6);

      assert.deepEqual(
        列表.make(1, 2, 3, 4, 5, 6),
        list2.conj(列表));
    });
  });

  describe("#zip(列表)", function () {
    it("zips two lists", function () {
      const list1 = 列表.make(1,2,3);
      const list2 = 列表.make(4,5,6);
      const result = list1.zip(list2);
      assert.deepEqual([...result],
        [1,4,2,5,3,6]);
    });

    it("zips uneven lists", function () {
      const list1 = 列表.make(1,2,3);
      const list2 = 列表.make(4,5,6,7,8);
      const result = list1.zip(list2);
      assert.deepEqual([...result],
        [1,4,2,5,3,6,7,8]);
      const result2 = list2.zip(list1);
      assert.deepEqual([...result2],
        [4,1,5,2,6,3,7,8]);
    });
  });

  describe("#zip(列表)", function () {
    it("unzips a 列表", function () {
      const 列表 = 列表.make(1,4,2,5,3,6);
      const result = 列表.unzip();
      assert.deepEqual(result,
        列表.make(
          列表.make(1,2,3),
          列表.make(4,5,6)));
    });
    it("unzips uneven 列表", function () {
      const 列表 = 列表.make(1,5,2,6,3,7,4);
      const result = 列表.unzip();
      assert.deepEqual(result,
        列表.make(
          列表.make(1,2,3,4),
          列表.make(5,6,7)));
    });
  });

  describe("#get isEmpty?", function () {

    it("Returns true for an empty 列表.", function () {
      const 列表 = 列表.emptyList;
      assert.equal(列表["isEmpty?"], true);
    });

    it("Returns false if the 列表 is not empty.", function () {
      const 列表 = 列表.make(1);
      assert.equal(列表["isEmpty?"], false);
    });

  });

  describe("#toList", function () {
    it("return a copy of the 列表", function () {
      const 列表 = 列表.make(1, 2, 3)
      const expected = 列表;
      const actual = 列表.toList();
      assert.deepEqual(expected, actual);
    });
  });

  describe("#get empty?", function () {

    it("Returns true for an empty 列表.", function () {
      const 列表 = 列表.emptyList;
      assert.equal(列表["empty?"], true);
    });

    it("Returns false if the 列表 is not empty.", function () {
      const 列表 = 列表.make(1);
      assert.equal(列表["empty?"], false);
    });

  });

  describe("emptyList", function () {
    describe("toString", function () {
      it("should return a formatted string representation of an empty linkedList", function () {
        let emptyList = 列表.emptyList
        assert.equal(emptyList.toString(), "()");
      });
    });
  });

  describe("isEmpty", function () {
    it("should return true for an empty 列表", function () {
      let 列表 = 列表.make();
      assert.equal(列表.isEmpty, true);
    });
    it("should return false for a none empty linkedList", function () {
      let 列表 = 列表.make(1);
      assert.equal(列表.isEmpty, false);
    });
  });

  describe("toString", function () {
    it("returns the expected string representation", function () {
      let 列表 = 列表.make(1, 2, 3);
      assert.equal(列表.toString(), "(1 2 3)");
    });
  });

  describe("new 列表(o, oo) ", () => {
    it("create a new 列表 for your fun and profit.", () => {
      var 列表;
      列表 = new 列表();
      assert.equal(列表.get(), undefined);
      assert.equal(列表.pop(), 列表.emptyList);

      列表 = new 列表(1);
      assert.equal(列表.get(), 1);
      列表 = new 列表(2, 列表);
      assert.equal(列表.get(), 2);
      assert.equal(列表.get(1), 1);
    });
  });

  describe("make(o...)", () => {
    it("makes a 列表", () => {
      assert.equal(列表.make(), 列表.emptyList);
      let 列表 = 列表.make(1, 2, 3);
      assert.equal(列表.get(0), 1);
      assert.equal(列表.get(1), 2);
      assert.equal(列表.get(2), 3);
    });
  });

  describe("count(o)", function () {
    it("counts", function () {
      let 列表 = 列表.make(1, 2, 3);
      assert.equal(列表.count(), 3);
    });
  });

  describe("get(index)", () => {
    it("gets value at index", () => {
      let 列表 = 列表.make(6,7,8);
      assert.equal(列表.get(0), 6);
      assert.equal(列表.get(1), 7);
      assert.equal(列表.get(2), 8);
    });
  });

  describe("invert", () => {
    it("inverts 列表", () => {
      var 列表 = 列表.make();
      列表 = 列表.invert();
      assert.equal(列表, 列表.emptyList);

      列表 = 列表.make(1);
      列表 = 列表.invert();
      assert.equal(列表.peek(),1);
      assert.equal(列表.skip(1), 列表.emptyList);

      列表 = 列表.push(2).push(3);
      assert.equal(列表.peek(), 3);

      列表 = 列表.invert();
      assert.equal(列表.peek(), 1);

      let oo = 列表.make(1,2,3);
      assert.equal(oo.toString(), "(1 2 3)");

      let xo = oo.invert();
      assert.equal(xo.toString(), "(3 2 1)");
    });
  });

  describe("#map(fn)", () => {
    it("maps through fn", ()=>{
      var 列表 = 列表.make();

      let add7 = (o) => { return o + 7 };

      result = 列表.map(add7);
      assert.equal(result, 列表.emptyList);

      列表 = 列表.make(1);
      列表 = 列表.map(add7);
      assert.equal(列表.get(), 8);

      列表 = 列表.push(2); 列表 = 列表.map(add7);
      assert.equal(列表.get(), 9);
      assert.equal(列表.get(1), 15);

      列表 = 列表.push(3);
      列表 = 列表.map(add7);
      assert.equal(列表.get(), 10);
      assert.equal(列表.get(1), 16);
      assert.equal(列表.get(2), 22);
    });
  });

  describe("#push(o)", () => {
    it("pushes o onto the 列表.", () => {
      var 列表 = 列表.make();

      列表 = 列表.push(1);
      assert.equal(列表.get(), 1)
      assert.equal(列表.skip(1), 列表.emptyList);

      列表 = 列表.push(2);
      assert.equal(列表.get(), 2)
      assert.equal(列表.get(1), 1)
      assert.equal(列表.skip(2), 列表.emptyList);
    });
  });

  describe("#reduce(fn)", () => {
    it("reduces the 列表", () => {
      var 列表 = 列表.make(),
          result;

      let add = (a,b) => { return b + a };

      result = 列表.reduce(add);
      assert.equal(result, undefined);

      result = 列表.reduce(add, 0);
      assert.equal(result, 0);

      列表 = 列表.push(1);
      result = 列表.reduce(add);
      assert.equal(result, 1);

      列表= 列表.push(2);
      result = 列表.reduce(add);
      assert.equal(result, 3);

      列表= 列表.push(3),
      result = 列表.reduce(add)
      assert.equal(result, 6)

      列表= 列表.make("a");
      result = 列表.reduce(add);
      assert.equal(result, "a");

      列表= 列表.push("b");
      result = 列表.reduce(add);
      assert.equal(result, "ab");

      列表= 列表.push("c");
      result = 列表.reduce(add);
      assert.equal(result, "abc");
    });
  });

  describe("#skip(count)", () => {
    it("skips", () => {
      let 列表 = 列表.make(6,7,8);
      assert.equal(列表.skip().peek(), 6);
      assert.equal(列表.skip().toString(),
        "(6 7 8)");
      assert.equal(列表.skip(0).peek(), 6);
      assert.equal(列表.skip(1).peek(), 7);
      assert.equal(列表.skip(2).peek(), 8);
      assert.equal(列表.skip(3).peek(), undefined);
    });
  });

  describe("#toString()", () => {
    it("formats 列表 as a string.", () => {
      var 列表 = 列表.make(),
        result;

      result = 列表.toString();
      assert.equal(result, "()");

      列表 = 列表.make(1);
      result = 列表.toString();
      assert.equal(result, "(1)");

      列表 = 列表.push(2);
      result = 列表.toString();
      assert.equal(result, "(2 1)");

      列表 = 列表.push(3);
      result = 列表.toString();
      assert.equal(result, "(3 2 1)");

      列表 = 列表.push("string");
      result = 列表.toString();
      assert.equal(result, "(\"string\" 3 2 1)");

      列表 = 列表.push(Symbol.for("symbol"));
      result = 列表.toString();
      assert.equal(result, "(symbol \"string\" 3 2 1)");

      // let ts = toString;
      let oo = 列表.make(3,2,1);
      assert.equal(oo.toString(), "(3 2 1)");

      // 列表 = push(pop(pop(o)), oo);
      // o = o.pop().pop().push(oo);
      // assert.equal(列表.toString(), "(1 2 3 (3 2 1))");
    });
  });

  // describe("contains(value)", function () {
  //   it("returns true if 列表 contains value", function () {
  //     let 列表 = 列表.make(1, 2, 3);
  //     assert.equal(列表.contains(3), true)
  //     assert.equal(列表.contains(4), false)
  //   });
  // });

  describe("find(value)", function () {
    it("returns first instance of value if found in 列表, otherwise undefined", function () {
      let 列表 = 列表.make(1, 2, 3);
      assert.deepEqual(列表.find(1), 列表.make(1, 2, 3));
      assert.deepEqual(列表.find(2), 列表.make(2, 3));
      assert.deepEqual(列表.find(3), 列表.make(3));
      assert.equal(列表.find(4), undefined);
    });
  });

  describe("until(value)", function () {
    it("returns a copy of the 列表 truncated to the item immediatly before the first instance of value", function () {
      let 列表 = 列表.make(1, 2, 3);
      assert.deepEqual(列表.until(2), 列表.make(1));
      assert.deepEqual(列表.until(3), 列表.make(1, 2));
      assert.deepEqual(列表.until(4), 列表);
    });
  });

  // describe("index(value)", function () {
  //   it("returns index of first instance of value in 列表, otherwise returns -1", function () {
  //     let 列表 = 列表.make(1, 2, 3);
  //     assert.equal(列表.index(3), 2)
  //     assert.equal(列表.index(4), -1)
  //   });
  // });

  describe("split", function () {

    it("should split a 列表", function () {
      let sAmp = Ṣymbol.for("&");

      let 列表 = 列表.make(1, 2, 3);
      assert.equal(列表.split(Ṣymbol.for("&")).toString(),
        "((1 2 3))");

      列表 = 列表.make(1, 2, sAmp, 3);
      assert.equal(列表.split(Ṣymbol.for("&")).toString(),
        "((1 2) (3))");

      列表 = 列表.make(1, sAmp, 2, sAmp, 3);
      assert.equal(列表.split(Ṣymbol.for("&")).toString(),
        "((1) (2) (3))");

      列表 = 列表.make(1, 2, 3, sAmp);
      assert.equal(列表.split(Ṣymbol.for("&")).toString(),
        "((1 2 3) ())");

      列表 = 列表.make(sAmp, 1, 2, 3);
      assert.equal(列表.split(Ṣymbol.for("&")).toString(),
        "(() (1 2 3))");

      列表 = 列表.make(1, sAmp, sAmp, 2, 3);
      assert.equal(列表.split(Ṣymbol.for("&")).toString(),
        "((1) () (2 3))");

      列表 = 列表.make(1, sAmp, sAmp, sAmp, 2, 3);
      assert.equal(列表.split(Ṣymbol.for("&")).toString(),
        "((1) () () (2 3))");
    });

  });



  describe("Symbol.iterator", () => {
    it("should not yield any values for an empty linkedList (LinkedList.air)", () => {
      const emptyList = 列表.emptyList;
      const results = [...emptyList];
      assert.deepEqual(results, []);

      let count = 0;
      for (const item of emptyList) {
        count++;
      }
      assert.equal(count, 0, "for...of loop should not execute for 列表.emptyList");
    });

    it("should handle a 列表 created by new 列表() (yields initial undefined value)", () => {
      // A new 列表() results in { o: undefined, oo: 列表.emptyList }, which has isEmpty=false.
      // The iterator will yield the 'o' value.
      const listFromDefaultConstructor = new 列表();
      const results = [...listFromDefaultConstructor];
      assert.deepEqual(results, [undefined], "Default constructor 列表 should yield its undefined 'o' value");
    });

    it("should yield the single element for a single-element 列表", () => {
      const 列表 = 列表.make(1); // Creates 列表: 1 -> emptyList
      const expected = [1];

      const resultsForOf = [];
      for (const item of 列表) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch");

      const resultsSpread = [...列表];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch");
    });

    it("should yield all elements in a multi-element 列表 in order", () => {
      const 列表 = 列表.make(1, 2, 3);

      const expected = [1, 2, 3];

      const resultsForOf = [];
      for (const item of 列表) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch for multi-element 列表");

      const resultsSpread = [...列表];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch for multi-element 列表");
    });

    it("should correctly yield null and undefined values if they are part of the 列表", () => {
      const 列表 = 列表.make(1, undefined, 3, null, 5); // Expected order: 5, null, 3, undefined, 1
      const expected = [1, undefined, 3, null, 5];

      const results = [...列表];
      assert.deepEqual(results, expected, "Spread syntax results mismatch for 列表 with null/undefined");
    });

    it("should not modify the original 列表 during iteration", () => {
      const 列表 = 列表.make("a", "b", "c"); // c -> b -> a
      const expectedItems = ["a", "b", "c"];
      const expectedToString = '("a" "b" "c")'; // Based on typical toString for such a linkedList structure

      // First iteration
      assert.deepEqual([...列表], expectedItems, "First iteration results mismatch");

      // Check linkedList integrity after iteration
      assert.equal(列表.toString(), expectedToString, "列表 string form changed after iteration");
      assert.equal(列表.count(), 3, "列表 count changed after iteration");
      assert.equal(列表.peek(), "a", "列表 head changed after iteration");

      // Second iteration
      assert.deepEqual([...列表], expectedItems, "Second iteration results mismatch");
    });

    it("should allow multiple iterations independently", () => {
      const 列表 = 列表.make("x", "y"); // y -> x
      const expected = ["x", "y"];

      const iterator1 = 列表[Symbol.iterator]();
      const iterator2 = 列表[Symbol.iterator]();

      assert.deepEqual(iterator1.next().value, "x");
      assert.deepEqual(iterator2.next().value, "x");
      assert.deepEqual(iterator1.next().value, "y");
      assert.deepEqual(iterator2.next().value, "y");
      assert.deepEqual(iterator1.next().done, true);
      assert.deepEqual(iterator2.next().done, true);
    });
  });

  describe("take(n)", function () {
    it("takes a certian number of items fron the 列表", function () {
      let 列表 = 列表.make(1, 2, 3);
      let result = 列表.take();
      assert.equal(result.toString(), "()");
      result = 列表.take(0);
      assert.equal(result.toString(), "()");
      result = 列表.take(1);
      assert.equal(result.toString(), "(1)");
      result = 列表.take(2);
      assert.equal(result.toString(), "(1 2)");
      result = 列表.take(3);
      assert.equal(result.toString(), "(1 2 3)");
      result = 列表.take(4);
      assert.equal(result.toString(), "(1 2 3)");
      result = 列表.take(5);
      assert.equal(result.toString(), "(1 2 3)");
    });
  });

  describe("partition", function () {
     it("partitions a 列表", function () {
       let 列表 = 列表.make(1, 2, 3, 4, 5);
       let result = 列表.partition(2);
       assert.equal(result.toString(),
         "((1 2) (3 4) (5))")
       result = 列表.partition(3);
       assert.equal(result.toString(),
         "((1 2 3) (4 5))")
     });
  });

  // describe("toObject", function () {
  //   it("convert the 列表 into aa object", function () {
  //     let 列表 = 列表.make("hello", "hola");
  //     let result = 列表.toObject();
  //   });
  // });
});
