
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: test/bubble.js             *
   *   Date: September 25th, 2025     *
   *   Library: Bubblescript          *
   *   version: 0.🦤.🍌.🥄            *
   *   Version: 0.1.6                 *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

  const assert = require("assert");

    const Bubble = require("../src/bubble");
  const Ṣymbol = require("../src/symbol");

describe("Bubble", () => {

  describe("#conj(bubble)", function () {
    it("conjoins bubble", function () {
       const bubble = Bubble.blow(1, 2, 3);
      const list2 = Bubble.blow(4, 5, 6);

      assert.deepEqual(
        Bubble.blow(1, 2, 3, 4, 5, 6),
        list2.conj(bubble));
    });
  });

  describe("#zip(bubble)", function () {
    it("zips two lists", function () {
      const list1 = Bubble.blow(1,2,3);
      const list2 = Bubble.blow(4,5,6);
      const result = list1.zip(list2);
      assert.deepEqual([...result],
        [1,4,2,5,3,6]);
    });

    it("zips uneven lists", function () {
      const list1 = Bubble.blow(1,2,3);
      const list2 = Bubble.blow(4,5,6,7,8);
      const result = list1.zip(list2);
      assert.deepEqual([...result],
        [1,4,2,5,3,6,7,8]);
      const result2 = list2.zip(list1);
      assert.deepEqual([...result2],
        [4,1,5,2,6,3,7,8]);
    });
  });

  describe("#zip(bubble)", function () {
    it("unzips a bubble", function () {
      const bubble = Bubble.blow(1,4,2,5,3,6);
      const result = bubble.unzip();
      assert.deepEqual(result,
        Bubble.blow(
          Bubble.blow(1,2,3),
          Bubble.blow(4,5,6)));
    });
    it("unzips uneven bubble", function () {
      const bubble = Bubble.blow(1,5,2,6,3,7,4);
      const result = bubble.unzip();
      assert.deepEqual(result,
        Bubble.blow(
          Bubble.blow(1,2,3,4),
          Bubble.blow(5,6,7)));
    });
  });

  describe("#get isEmpty?", function () {

    it("Returns true for an empty bubble.", function () {
      const bubble = Bubble.emptyList;
      assert.equal(bubble["isEmpty?"], true);
    });

    it("Returns false if the bubble is not empty.", function () {
      const bubble = Bubble.blow(1);
      assert.equal(bubble["isEmpty?"], false);
    });

  });

  describe("#toList", function () {
    it("return a copy of the bubble", function () {
      const bubble = Bubble.blow(1, 2, 3)
      const expected = bubble;
      const actual = bubble.toList();
      assert.deepEqual(expected, actual);
    });
  });

  describe("#get empty?", function () {

    it("Returns true for an empty bubble.", function () {
      const bubble = Bubble.emptyList;
      assert.equal(bubble["empty?"], true);
    });

    it("Returns false if the bubble is not empty.", function () {
      const bubble = Bubble.blow(1);
      assert.equal(bubble["empty?"], false);
    });

  });

  describe("emptyList", function () {
    describe("toString", function () {
      it("should return a formatted string representation of an empty linkedList", function () {
        let emptyList = Bubble.emptyList
        assert.equal(emptyList.toString(), "()");
      });
    });
  });

  describe("isEmpty", function () {
    it("should return true for an empty bubble", function () {
      let bubble = Bubble.blow();
      assert.equal(bubble.isEmpty, true);
    });
    it("should return false for a none empty linkedList", function () {
      let bubble = Bubble.blow(1);
      assert.equal(bubble.isEmpty, false);
    });
  });

  describe("toString", function () {
    it("returns the expected string representation", function () {
      let bubble = Bubble.blow(1, 2, 3);
      assert.equal(bubble.toString(), "(1 2 3)");
    });
  });

  describe("new Bubble(o, oo) ", () => {
    it("create a new bubble for your fun and profit.", () => {
      var bubble;
      bubble = new Bubble();
      assert.equal(bubble.get(), undefined);
      assert.equal(bubble.pop(), Bubble.emptyList);

      bubble = new Bubble(1);
      assert.equal(bubble.get(), 1);
      bubble = new Bubble(2, bubble);
      assert.equal(bubble.get(), 2);
      assert.equal(bubble.get(1), 1);
    });
  });

  describe("blow(o...)", () => {
    it("makes a bubble", () => {
      assert.equal(Bubble.blow(), Bubble.emptyList);
      let bubble = Bubble.blow(1, 2, 3);
      assert.equal(bubble.get(0), 1);
      assert.equal(bubble.get(1), 2);
      assert.equal(bubble.get(2), 3);
    });
  });

  describe("count(o)", function () {
    it("counts", function () {
      let bubble = Bubble.blow(1, 2, 3);
      assert.equal(bubble.count(), 3);
    });
  });

  describe("get(index)", () => {
    it("gets value at index", () => {
      let bubble = Bubble.blow(6,7,8);
      assert.equal(bubble.get(0), 6);
      assert.equal(bubble.get(1), 7);
      assert.equal(bubble.get(2), 8);
    });
  });

  describe("invert", () => {
    it("inverts bubble", () => {
      var bubble = Bubble.blow();
      bubble = bubble.invert();
      assert.equal(bubble, Bubble.emptyList);

      bubble = Bubble.blow(1);
      bubble = bubble.invert();
      assert.equal(bubble.peek(),1);
      assert.equal(bubble.skip(1), Bubble.emptyList);

      bubble = bubble.push(2).push(3);
      assert.equal(bubble.peek(), 3);

      bubble = bubble.invert();
      assert.equal(bubble.peek(), 1);

      let oo = Bubble.blow(1,2,3);
      assert.equal(oo.toString(), "(1 2 3)");

      let xo = oo.invert();
      assert.equal(xo.toString(), "(3 2 1)");
    });
  });

  describe("#map(funk)", () => {
    it("maps through funk", ()=>{
      var bubble = Bubble.blow();

      let add7 = (o) => { return o + 7 };

      result = bubble.map(add7);
      assert.equal(result, Bubble.emptyList);

      bubble = Bubble.blow(1);
      bubble = bubble.map(add7);
      assert.equal(bubble.get(), 8);

      bubble = bubble.push(2); bubble = bubble.map(add7);
      assert.equal(bubble.get(), 9);
      assert.equal(bubble.get(1), 15);

      bubble = bubble.push(3);
      bubble = bubble.map(add7);
      assert.equal(bubble.get(), 10);
      assert.equal(bubble.get(1), 16);
      assert.equal(bubble.get(2), 22);
    });
  });

  describe("#push(o)", () => {
    it("pushes o onto the Bubble.", () => {
      var bubble = Bubble.blow();

      bubble = bubble.push(1);
      assert.equal(bubble.get(), 1)
      assert.equal(bubble.skip(1), Bubble.emptyList);

      bubble = bubble.push(2);
      assert.equal(bubble.get(), 2)
      assert.equal(bubble.get(1), 1)
      assert.equal(bubble.skip(2), Bubble.emptyList);
    });
  });

  describe("#reduce(funk)", () => {
    it("reduces the bubble", () => {
      var bubble = Bubble.blow(),
          result;

      let add = (a,b) => { return b + a };

      result = bubble.reduce(add);
      assert.equal(result, undefined);

      result = bubble.reduce(add, 0);
      assert.equal(result, 0);

      bubble = bubble.push(1);
      result = bubble.reduce(add);
      assert.equal(result, 1);

      bubble= bubble.push(2);
      result = bubble.reduce(add);
      assert.equal(result, 3);

      bubble= bubble.push(3),
      result = bubble.reduce(add)
      assert.equal(result, 6)

      bubble= Bubble.blow("a");
      result = bubble.reduce(add);
      assert.equal(result, "a");

      bubble= bubble.push("b");
      result = bubble.reduce(add);
      assert.equal(result, "ab");

      bubble= bubble.push("c");
      result = bubble.reduce(add);
      assert.equal(result, "abc");
    });
  });

  describe("#skip(count)", () => {
    it("skips", () => {
      let bubble = Bubble.blow(6,7,8);
      assert.equal(bubble.skip().peek(), 6);
      assert.equal(bubble.skip().toString(),
        "(6 7 8)");
      assert.equal(bubble.skip(0).peek(), 6);
      assert.equal(bubble.skip(1).peek(), 7);
      assert.equal(bubble.skip(2).peek(), 8);
      assert.equal(bubble.skip(3).peek(), undefined);
    });
  });

  describe("#toString()", () => {
    it("formats bubble as a string.", () => {
      var bubble = Bubble.blow(),
        result;

      result = bubble.toString();
      assert.equal(result, "()");

      bubble = Bubble.blow(1);
      result = bubble.toString();
      assert.equal(result, "(1)");

      bubble = bubble.push(2);
      result = bubble.toString();
      assert.equal(result, "(2 1)");

      bubble = bubble.push(3);
      result = bubble.toString();
      assert.equal(result, "(3 2 1)");

      bubble = bubble.push("string");
      result = bubble.toString();
      assert.equal(result, "(\"string\" 3 2 1)");

      bubble = bubble.push(Symbol.for("symbol"));
      result = bubble.toString();
      assert.equal(result, "(symbol \"string\" 3 2 1)");

      // let ts = toString;
      let oo = Bubble.blow(3,2,1);
      assert.equal(oo.toString(), "(3 2 1)");

      // bubble = push(pop(pop(o)), oo);
      // o = o.pop().pop().push(oo);
      // assert.equal(bubble.toString(), "(1 2 3 (3 2 1))");
    });
  });

  // describe("contains(value)", function () {
  //   it("returns true if bubble contains value", function () {
  //     let bubble = Bubble.blow(1, 2, 3);
  //     assert.equal(bubble.contains(3), true)
  //     assert.equal(bubble.contains(4), false)
  //   });
  // });

  describe("find(value)", function () {
    it("returns first instance of value if found in bubble, otherwise undefined", function () {
      let bubble = Bubble.blow(1, 2, 3);
      assert.deepEqual(bubble.find(1), Bubble.blow(1, 2, 3));
      assert.deepEqual(bubble.find(2), Bubble.blow(2, 3));
      assert.deepEqual(bubble.find(3), Bubble.blow(3));
      assert.equal(bubble.find(4), undefined);
    });
  });

  describe("until(value)", function () {
    it("returns a copy of the bubble truncated to the item immediatly before the first instance of value", function () {
      let bubble = Bubble.blow(1, 2, 3);
      assert.deepEqual(bubble.until(2), Bubble.blow(1));
      assert.deepEqual(bubble.until(3), Bubble.blow(1, 2));
      assert.deepEqual(bubble.until(4), bubble);
    });
  });

  // describe("index(value)", function () {
  //   it("returns index of first instance of value in bubble, otherwise returns -1", function () {
  //     let bubble = Bubble.blow(1, 2, 3);
  //     assert.equal(bubble.index(3), 2)
  //     assert.equal(bubble.index(4), -1)
  //   });
  // });

  describe("split", function () {

    it("should split a bubble", function () {
      let sAmp = Ṣymbol.for("&");

      let bubble = Bubble.blow(1, 2, 3);
      assert.equal(bubble.split(Ṣymbol.for("&")).toString(),
        "((1 2 3))");

      bubble = Bubble.blow(1, 2, sAmp, 3);
      assert.equal(bubble.split(Ṣymbol.for("&")).toString(),
        "((1 2) (3))");

      bubble = Bubble.blow(1, sAmp, 2, sAmp, 3);
      assert.equal(bubble.split(Ṣymbol.for("&")).toString(),
        "((1) (2) (3))");

      bubble = Bubble.blow(1, 2, 3, sAmp);
      assert.equal(bubble.split(Ṣymbol.for("&")).toString(),
        "((1 2 3) ())");

      bubble = Bubble.blow(sAmp, 1, 2, 3);
      assert.equal(bubble.split(Ṣymbol.for("&")).toString(),
        "(() (1 2 3))");

      bubble = Bubble.blow(1, sAmp, sAmp, 2, 3);
      assert.equal(bubble.split(Ṣymbol.for("&")).toString(),
        "((1) () (2 3))");

      bubble = Bubble.blow(1, sAmp, sAmp, sAmp, 2, 3);
      assert.equal(bubble.split(Ṣymbol.for("&")).toString(),
        "((1) () () (2 3))");
    });

  });



  describe("Symbol.iterator", () => {
    it("should not yield any values for an empty linkedList (LinkedList.air)", () => {
      const emptyList = Bubble.emptyList;
      const results = [...emptyList];
      assert.deepEqual(results, []);

      let count = 0;
      for (const item of emptyList) {
        count++;
      }
      assert.equal(count, 0, "for...of loop should not execute for Bubble.emptyList");
    });

    it("should handle a bubble created by new Bubble() (yields initial undefined value)", () => {
      // A new Bubble() results in { o: undefined, oo: Bubble.emptyList }, which has isEmpty=false.
      // The iterator will yield the 'o' value.
      const listFromDefaultConstructor = new Bubble();
      const results = [...listFromDefaultConstructor];
      assert.deepEqual(results, [undefined], "Default constructor Bubble should yield its undefined 'o' value");
    });

    it("should yield the single element for a single-element bubble", () => {
      const bubble = Bubble.blow(1); // Creates bubble: 1 -> emptyList
      const expected = [1];

      const resultsForOf = [];
      for (const item of bubble) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch");

      const resultsSpread = [...bubble];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch");
    });

    it("should yield all elements in a multi-element bubble in order", () => {
      const bubble = Bubble.blow(1, 2, 3);

      const expected = [1, 2, 3];

      const resultsForOf = [];
      for (const item of bubble) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch for multi-element bubble");

      const resultsSpread = [...bubble];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch for multi-element bubble");
    });

    it("should correctly yield null and undefined values if they are part of the bubble", () => {
      const bubble = Bubble.blow(1, undefined, 3, null, 5); // Expected order: 5, null, 3, undefined, 1
      const expected = [1, undefined, 3, null, 5];

      const results = [...bubble];
      assert.deepEqual(results, expected, "Spread syntax results mismatch for bubble with null/undefined");
    });

    it("should not modify the original bubble during iteration", () => {
      const bubble = Bubble.blow("a", "b", "c"); // c -> b -> a
      const expectedItems = ["a", "b", "c"];
      const expectedToString = '("a" "b" "c")'; // Based on typical toString for such a linkedList structure

      // First iteration
      assert.deepEqual([...bubble], expectedItems, "First iteration results mismatch");

      // Check linkedList integrity after iteration
      assert.equal(bubble.toString(), expectedToString, "Bubble string form changed after iteration");
      assert.equal(bubble.count(), 3, "Bubble count changed after iteration");
      assert.equal(bubble.peek(), "a", "Bubble head changed after iteration");

      // Second iteration
      assert.deepEqual([...bubble], expectedItems, "Second iteration results mismatch");
    });

    it("should allow multiple iterations independently", () => {
      const bubble = Bubble.blow("x", "y"); // y -> x
      const expected = ["x", "y"];

      const iterator1 = bubble[Symbol.iterator]();
      const iterator2 = bubble[Symbol.iterator]();

      assert.deepEqual(iterator1.next().value, "x");
      assert.deepEqual(iterator2.next().value, "x");
      assert.deepEqual(iterator1.next().value, "y");
      assert.deepEqual(iterator2.next().value, "y");
      assert.deepEqual(iterator1.next().done, true);
      assert.deepEqual(iterator2.next().done, true);
    });
  });

  describe("take(n)", function () {
    it("takes a certian number of items fron the bubble", function () {
      let bubble = Bubble.blow(1, 2, 3);
      let result = bubble.take();
      assert.equal(result.toString(), "()");
      result = bubble.take(0);
      assert.equal(result.toString(), "()");
      result = bubble.take(1);
      assert.equal(result.toString(), "(1)");
      result = bubble.take(2);
      assert.equal(result.toString(), "(1 2)");
      result = bubble.take(3);
      assert.equal(result.toString(), "(1 2 3)");
      result = bubble.take(4);
      assert.equal(result.toString(), "(1 2 3)");
      result = bubble.take(5);
      assert.equal(result.toString(), "(1 2 3)");
    });
  });

  describe("partition", function () {
     it("partitions a bubble", function () {
       let bubble = Bubble.blow(1, 2, 3, 4, 5);
       let result = bubble.partition(2);
       assert.equal(result.toString(),
         "((1 2) (3 4) (5))")
       result = bubble.partition(3);
       assert.equal(result.toString(),
         "((1 2 3) (4 5))")
     });
  });

  // describe("toObject", function () {
  //   it("convert the bubble into aa object", function () {
  //     let bubble = Bubble.blow("hello", "hola");
  //     let result = bubble.toObject();
  //   });
  // });
});
