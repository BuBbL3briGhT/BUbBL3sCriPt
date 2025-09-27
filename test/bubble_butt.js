
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: test/bubble_butt.js             *
   *   Date: September 25th, 2025     *
   *   Library: Bubblescript          *
   *   version: 0.🦤.🍌.🥄            *
   *   Version: 0.1.6                 *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

  const assert = require("assert");

    const BubbleButt = require("../src/bubble_butt");
  const Ṣymbol = require("../src/symbol");

describe("BubbleButt", () => {

  describe("#conj(bubbleButt)", function () {
    it("conjoins bubbleButt", function () {
       const bubbleButt = BubbleButt.make(1, 2, 3);
      const list2 = BubbleButt.make(4, 5, 6);

      assert.deepEqual(
        BubbleButt.make(1, 2, 3, 4, 5, 6),
        list2.conj(bubbleButt));
    });
  });

  describe("#zip(bubbleButt)", function () {
    it("zips two lists", function () {
      const list1 = BubbleButt.make(1,2,3);
      const list2 = BubbleButt.make(4,5,6);
      const result = list1.zip(list2);
      assert.deepEqual([...result],
        [1,4,2,5,3,6]);
    });

    it("zips uneven lists", function () {
      const list1 = BubbleButt.make(1,2,3);
      const list2 = BubbleButt.make(4,5,6,7,8);
      const result = list1.zip(list2);
      assert.deepEqual([...result],
        [1,4,2,5,3,6,7,8]);
      const result2 = list2.zip(list1);
      assert.deepEqual([...result2],
        [4,1,5,2,6,3,7,8]);
    });
  });

  describe("#zip(bubbleButt)", function () {
    it("unzips a bubbleButt", function () {
      const bubbleButt = BubbleButt.make(1,4,2,5,3,6);
      const result = bubbleButt.unzip();
      assert.deepEqual(result,
        BubbleButt.make(
          BubbleButt.make(1,2,3),
          BubbleButt.make(4,5,6)));
    });
    it("unzips uneven bubbleButt", function () {
      const bubbleButt = BubbleButt.make(1,5,2,6,3,7,4);
      const result = bubbleButt.unzip();
      assert.deepEqual(result,
        BubbleButt.make(
          BubbleButt.make(1,2,3,4),
          BubbleButt.make(5,6,7)));
    });
  });

  describe("#get isEmpty?", function () {

    it("Returns true for an empty bubbleButt.", function () {
      const bubbleButt = BubbleButt.emptyList;
      assert.equal(bubbleButt["isEmpty?"], true);
    });

    it("Returns false if the bubbleButt is not empty.", function () {
      const bubbleButt = BubbleButt.make(1);
      assert.equal(bubbleButt["isEmpty?"], false);
    });

  });

  describe("#toList", function () {
    it("return a copy of the bubbleButt", function () {
      const bubbleButt = BubbleButt.make(1, 2, 3)
      const expected = bubbleButt;
      const actual = bubbleButt.toList();
      assert.deepEqual(expected, actual);
    });
  });

  describe("#get empty?", function () {

    it("Returns true for an empty bubbleButt.", function () {
      const bubbleButt = BubbleButt.emptyList;
      assert.equal(bubbleButt["empty?"], true);
    });

    it("Returns false if the bubbleButt is not empty.", function () {
      const bubbleButt = BubbleButt.make(1);
      assert.equal(bubbleButt["empty?"], false);
    });

  });

  describe("emptyList", function () {
    describe("toString", function () {
      it("should return a formatted string representation of an empty linkedList", function () {
        let emptyList = BubbleButt.emptyList
        assert.equal(emptyList.toString(), "()");
      });
    });
  });

  describe("isEmpty", function () {
    it("should return true for an empty bubbleButt", function () {
      let bubbleButt = BubbleButt.make();
      assert.equal(bubbleButt.isEmpty, true);
    });
    it("should return false for a none empty linkedList", function () {
      let bubbleButt = BubbleButt.make(1);
      assert.equal(bubbleButt.isEmpty, false);
    });
  });

  describe("toString", function () {
    it("returns the expected string representation", function () {
      let bubbleButt = BubbleButt.make(1, 2, 3);
      assert.equal(bubbleButt.toString(), "(1 2 3)");
    });
  });

  describe("new BubbleButt(o, oo) ", () => {
    it("create a new bubbleButt for your fun and profit.", () => {
      var bubbleButt;
      bubbleButt = new BubbleButt();
      assert.equal(bubbleButt.get(), undefined);
      assert.equal(bubbleButt.pop(), BubbleButt.emptyList);

      bubbleButt = new BubbleButt(1);
      assert.equal(bubbleButt.get(), 1);
      bubbleButt = new BubbleButt(2, bubbleButt);
      assert.equal(bubbleButt.get(), 2);
      assert.equal(bubbleButt.get(1), 1);
    });
  });

  describe("make(o...)", () => {
    it("makes a bubbleButt", () => {
      assert.equal(BubbleButt.make(), BubbleButt.emptyList);
      let bubbleButt = BubbleButt.make(1, 2, 3);
      assert.equal(bubbleButt.get(0), 1);
      assert.equal(bubbleButt.get(1), 2);
      assert.equal(bubbleButt.get(2), 3);
    });
  });

  describe("count(o)", function () {
    it("counts", function () {
      let bubbleButt = BubbleButt.make(1, 2, 3);
      assert.equal(bubbleButt.count(), 3);
    });
  });

  describe("get(index)", () => {
    it("gets value at index", () => {
      let bubbleButt = BubbleButt.make(6,7,8);
      assert.equal(bubbleButt.get(0), 6);
      assert.equal(bubbleButt.get(1), 7);
      assert.equal(bubbleButt.get(2), 8);
    });
  });

  describe("invert", () => {
    it("inverts bubbleButt", () => {
      var bubbleButt = BubbleButt.make();
      bubbleButt = bubbleButt.invert();
      assert.equal(bubbleButt, BubbleButt.emptyList);

      bubbleButt = BubbleButt.make(1);
      bubbleButt = bubbleButt.invert();
      assert.equal(bubbleButt.peek(),1);
      assert.equal(bubbleButt.skip(1), BubbleButt.emptyList);

      bubbleButt = bubbleButt.push(2).push(3);
      assert.equal(bubbleButt.peek(), 3);

      bubbleButt = bubbleButt.invert();
      assert.equal(bubbleButt.peek(), 1);

      let oo = BubbleButt.make(1,2,3);
      assert.equal(oo.toString(), "(1 2 3)");

      let xo = oo.invert();
      assert.equal(xo.toString(), "(3 2 1)");
    });
  });

  describe("#map(fn)", () => {
    it("maps through fn", ()=>{
      var bubbleButt = BubbleButt.make();

      let add7 = (o) => { return o + 7 };

      result = bubbleButt.map(add7);
      assert.equal(result, BubbleButt.emptyList);

      bubbleButt = BubbleButt.make(1);
      bubbleButt = bubbleButt.map(add7);
      assert.equal(bubbleButt.get(), 8);

      bubbleButt = bubbleButt.push(2); bubbleButt = bubbleButt.map(add7);
      assert.equal(bubbleButt.get(), 9);
      assert.equal(bubbleButt.get(1), 15);

      bubbleButt = bubbleButt.push(3);
      bubbleButt = bubbleButt.map(add7);
      assert.equal(bubbleButt.get(), 10);
      assert.equal(bubbleButt.get(1), 16);
      assert.equal(bubbleButt.get(2), 22);
    });
  });

  describe("#push(o)", () => {
    it("pushes o onto the BubbleButt.", () => {
      var bubbleButt = BubbleButt.make();

      bubbleButt = bubbleButt.push(1);
      assert.equal(bubbleButt.get(), 1)
      assert.equal(bubbleButt.skip(1), BubbleButt.emptyList);

      bubbleButt = bubbleButt.push(2);
      assert.equal(bubbleButt.get(), 2)
      assert.equal(bubbleButt.get(1), 1)
      assert.equal(bubbleButt.skip(2), BubbleButt.emptyList);
    });
  });

  describe("#reduce(fn)", () => {
    it("reduces the bubbleButt", () => {
      var bubbleButt = BubbleButt.make(),
          result;

      let add = (a,b) => { return b + a };

      result = bubbleButt.reduce(add);
      assert.equal(result, undefined);

      result = bubbleButt.reduce(add, 0);
      assert.equal(result, 0);

      bubbleButt = bubbleButt.push(1);
      result = bubbleButt.reduce(add);
      assert.equal(result, 1);

      bubbleButt= bubbleButt.push(2);
      result = bubbleButt.reduce(add);
      assert.equal(result, 3);

      bubbleButt= bubbleButt.push(3),
      result = bubbleButt.reduce(add)
      assert.equal(result, 6)

      bubbleButt= BubbleButt.make("a");
      result = bubbleButt.reduce(add);
      assert.equal(result, "a");

      bubbleButt= bubbleButt.push("b");
      result = bubbleButt.reduce(add);
      assert.equal(result, "ab");

      bubbleButt= bubbleButt.push("c");
      result = bubbleButt.reduce(add);
      assert.equal(result, "abc");
    });
  });

  describe("#skip(count)", () => {
    it("skips", () => {
      let bubbleButt = BubbleButt.make(6,7,8);
      assert.equal(bubbleButt.skip().peek(), 6);
      assert.equal(bubbleButt.skip().toString(),
        "(6 7 8)");
      assert.equal(bubbleButt.skip(0).peek(), 6);
      assert.equal(bubbleButt.skip(1).peek(), 7);
      assert.equal(bubbleButt.skip(2).peek(), 8);
      assert.equal(bubbleButt.skip(3).peek(), undefined);
    });
  });

  describe("#toString()", () => {
    it("formats bubbleButt as a string.", () => {
      var bubbleButt = BubbleButt.make(),
        result;

      result = bubbleButt.toString();
      assert.equal(result, "()");

      bubbleButt = BubbleButt.make(1);
      result = bubbleButt.toString();
      assert.equal(result, "(1)");

      bubbleButt = bubbleButt.push(2);
      result = bubbleButt.toString();
      assert.equal(result, "(2 1)");

      bubbleButt = bubbleButt.push(3);
      result = bubbleButt.toString();
      assert.equal(result, "(3 2 1)");

      bubbleButt = bubbleButt.push("string");
      result = bubbleButt.toString();
      assert.equal(result, "(\"string\" 3 2 1)");

      bubbleButt = bubbleButt.push(Symbol.for("symbol"));
      result = bubbleButt.toString();
      assert.equal(result, "(symbol \"string\" 3 2 1)");

      // let ts = toString;
      let oo = BubbleButt.make(3,2,1);
      assert.equal(oo.toString(), "(3 2 1)");

      // bubbleButt = push(pop(pop(o)), oo);
      // o = o.pop().pop().push(oo);
      // assert.equal(bubbleButt.toString(), "(1 2 3 (3 2 1))");
    });
  });

  // describe("contains(value)", function () {
  //   it("returns true if bubbleButt contains value", function () {
  //     let bubbleButt = BubbleButt.make(1, 2, 3);
  //     assert.equal(bubbleButt.contains(3), true)
  //     assert.equal(bubbleButt.contains(4), false)
  //   });
  // });

  describe("find(value)", function () {
    it("returns first instance of value if found in bubbleButt, otherwise undefined", function () {
      let bubbleButt = BubbleButt.make(1, 2, 3);
      assert.deepEqual(bubbleButt.find(1), BubbleButt.make(1, 2, 3));
      assert.deepEqual(bubbleButt.find(2), BubbleButt.make(2, 3));
      assert.deepEqual(bubbleButt.find(3), BubbleButt.make(3));
      assert.equal(bubbleButt.find(4), undefined);
    });
  });

  describe("until(value)", function () {
    it("returns a copy of the bubbleButt truncated to the item immediatly before the first instance of value", function () {
      let bubbleButt = BubbleButt.make(1, 2, 3);
      assert.deepEqual(bubbleButt.until(2), BubbleButt.make(1));
      assert.deepEqual(bubbleButt.until(3), BubbleButt.make(1, 2));
      assert.deepEqual(bubbleButt.until(4), bubbleButt);
    });
  });

  // describe("index(value)", function () {
  //   it("returns index of first instance of value in bubbleButt, otherwise returns -1", function () {
  //     let bubbleButt = BubbleButt.make(1, 2, 3);
  //     assert.equal(bubbleButt.index(3), 2)
  //     assert.equal(bubbleButt.index(4), -1)
  //   });
  // });

  describe("split", function () {

    it("should split a bubbleButt", function () {
      let sAmp = Ṣymbol.for("&");

      let bubbleButt = BubbleButt.make(1, 2, 3);
      assert.equal(bubbleButt.split(Ṣymbol.for("&")).toString(),
        "((1 2 3))");

      bubbleButt = BubbleButt.make(1, 2, sAmp, 3);
      assert.equal(bubbleButt.split(Ṣymbol.for("&")).toString(),
        "((1 2) (3))");

      bubbleButt = BubbleButt.make(1, sAmp, 2, sAmp, 3);
      assert.equal(bubbleButt.split(Ṣymbol.for("&")).toString(),
        "((1) (2) (3))");

      bubbleButt = BubbleButt.make(1, 2, 3, sAmp);
      assert.equal(bubbleButt.split(Ṣymbol.for("&")).toString(),
        "((1 2 3) ())");

      bubbleButt = BubbleButt.make(sAmp, 1, 2, 3);
      assert.equal(bubbleButt.split(Ṣymbol.for("&")).toString(),
        "(() (1 2 3))");

      bubbleButt = BubbleButt.make(1, sAmp, sAmp, 2, 3);
      assert.equal(bubbleButt.split(Ṣymbol.for("&")).toString(),
        "((1) () (2 3))");

      bubbleButt = BubbleButt.make(1, sAmp, sAmp, sAmp, 2, 3);
      assert.equal(bubbleButt.split(Ṣymbol.for("&")).toString(),
        "((1) () () (2 3))");
    });

  });



  describe("Symbol.iterator", () => {
    it("should not yield any values for an empty linkedList (LinkedList.air)", () => {
      const emptyList = BubbleButt.emptyList;
      const results = [...emptyList];
      assert.deepEqual(results, []);

      let count = 0;
      for (const item of emptyList) {
        count++;
      }
      assert.equal(count, 0, "for...of loop should not execute for BubbleButt.emptyList");
    });

    it("should handle a bubbleButt created by new BubbleButt() (yields initial undefined value)", () => {
      // A new BubbleButt() results in { o: undefined, oo: BubbleButt.emptyList }, which has isEmpty=false.
      // The iterator will yield the 'o' value.
      const listFromDefaultConstructor = new BubbleButt();
      const results = [...listFromDefaultConstructor];
      assert.deepEqual(results, [undefined], "Default constructor BubbleButt should yield its undefined 'o' value");
    });

    it("should yield the single element for a single-element bubbleButt", () => {
      const bubbleButt = BubbleButt.make(1); // Creates bubbleButt: 1 -> emptyList
      const expected = [1];

      const resultsForOf = [];
      for (const item of bubbleButt) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch");

      const resultsSpread = [...bubbleButt];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch");
    });

    it("should yield all elements in a multi-element bubbleButt in order", () => {
      const bubbleButt = BubbleButt.make(1, 2, 3);

      const expected = [1, 2, 3];

      const resultsForOf = [];
      for (const item of bubbleButt) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch for multi-element bubbleButt");

      const resultsSpread = [...bubbleButt];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch for multi-element bubbleButt");
    });

    it("should correctly yield null and undefined values if they are part of the bubbleButt", () => {
      const bubbleButt = BubbleButt.make(1, undefined, 3, null, 5); // Expected order: 5, null, 3, undefined, 1
      const expected = [1, undefined, 3, null, 5];

      const results = [...bubbleButt];
      assert.deepEqual(results, expected, "Spread syntax results mismatch for bubbleButt with null/undefined");
    });

    it("should not modify the original bubbleButt during iteration", () => {
      const bubbleButt = BubbleButt.make("a", "b", "c"); // c -> b -> a
      const expectedItems = ["a", "b", "c"];
      const expectedToString = '("a" "b" "c")'; // Based on typical toString for such a linkedList structure

      // First iteration
      assert.deepEqual([...bubbleButt], expectedItems, "First iteration results mismatch");

      // Check linkedList integrity after iteration
      assert.equal(bubbleButt.toString(), expectedToString, "BubbleButt string form changed after iteration");
      assert.equal(bubbleButt.count(), 3, "BubbleButt count changed after iteration");
      assert.equal(bubbleButt.peek(), "a", "BubbleButt head changed after iteration");

      // Second iteration
      assert.deepEqual([...bubbleButt], expectedItems, "Second iteration results mismatch");
    });

    it("should allow multiple iterations independently", () => {
      const bubbleButt = BubbleButt.make("x", "y"); // y -> x
      const expected = ["x", "y"];

      const iterator1 = bubbleButt[Symbol.iterator]();
      const iterator2 = bubbleButt[Symbol.iterator]();

      assert.deepEqual(iterator1.next().value, "x");
      assert.deepEqual(iterator2.next().value, "x");
      assert.deepEqual(iterator1.next().value, "y");
      assert.deepEqual(iterator2.next().value, "y");
      assert.deepEqual(iterator1.next().done, true);
      assert.deepEqual(iterator2.next().done, true);
    });
  });

  describe("take(n)", function () {
    it("takes a certian number of items fron the bubbleButt", function () {
      let bubbleButt = BubbleButt.make(1, 2, 3);
      let result = bubbleButt.take();
      assert.equal(result.toString(), "()");
      result = bubbleButt.take(0);
      assert.equal(result.toString(), "()");
      result = bubbleButt.take(1);
      assert.equal(result.toString(), "(1)");
      result = bubbleButt.take(2);
      assert.equal(result.toString(), "(1 2)");
      result = bubbleButt.take(3);
      assert.equal(result.toString(), "(1 2 3)");
      result = bubbleButt.take(4);
      assert.equal(result.toString(), "(1 2 3)");
      result = bubbleButt.take(5);
      assert.equal(result.toString(), "(1 2 3)");
    });
  });

  describe("partition", function () {
     it("partitions a bubbleButt", function () {
       let bubbleButt = BubbleButt.make(1, 2, 3, 4, 5);
       let result = bubbleButt.partition(2);
       assert.equal(result.toString(),
         "((1 2) (3 4) (5))")
       result = bubbleButt.partition(3);
       assert.equal(result.toString(),
         "((1 2 3) (4 5))")
     });
  });

  // describe("toObject", function () {
  //   it("convert the bubbleButt into aa object", function () {
  //     let bubbleButt = BubbleButt.make("hello", "hola");
  //     let result = bubbleButt.toObject();
  //   });
  // });
});
