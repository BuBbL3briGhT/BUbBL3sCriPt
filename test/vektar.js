const assert = require("assert");

const Vektar = require("../src/vektar");
const Ṣymbol = require("../src/symbol");

describe("Vektar", () => {

  describe("emptyVector", function () {
    describe("toString", function () {
      it("should return a formatted string representation of an empty vektar", function () {
        let emptyVector = Vektar.emptyVector
        assert.equal(emptyVector.toString(), "[]");
      });
    });
  });

  describe("isEmpty", function () {
    it("should return true for an empty vektar", function () {
      let vektar = Vektar.blow();
      assert.equal(vektar.isEmpty, true);
    });
    it("should return false for a none empty vektar", function () {
      let vektar = Vektar.blow(1);
      assert.equal(vektar.isEmpty, false);
    });
  });

  describe("toString", function () {
    it("returns the expected string representation", function () {
      let vektar = Vektar.blow(1, 2, 3);
      assert.equal(vektar.toString(), "[1 2 3]");
    });
  });

  describe("new Vektar(o, oo) ", () => {
    it("create a new vektar for your fun and profit.", () => {
      var vektar;
      vektar = new Vektar();
      assert.equal(vektar.get(), undefined);
      assert.equal(vektar.skip(1), Vektar.emptyVector);

      vektar = new Vektar(1);
      assert.equal(vektar.get(), 1);
      vektar = new Vektar(2, vektar);
      assert.equal(vektar.get(), 2);
      assert.equal(vektar.get(1), 1);
    });
  });

  describe("blow(o...)", () => {
    it("makes a vektar", () => {
      assert.equal(Vektar.blow(), Vektar.emptyVector);
      let vektar = Vektar.blow(1, 2, 3);
      assert.equal(vektar.get(0), 3);
      assert.equal(vektar.get(1), 2);
      assert.equal(vektar.get(2), 1);
    });
  });

  describe("count(o)", function () {
    it("counts", function () {
      let vektar = Vektar.blow(1, 2, 3);
      assert.equal(vektar.count(), 3);
    });
  });

  describe("get(o, index)", () => {
    it("gets value of o at index", () => {
      let vektar = Vektar.blow(6,7,8);
      assert.equal(vektar.get(0), 8);
      assert.equal(vektar.get(1), 7);
      assert.equal(vektar.get(2), 6);
    });
  });

  describe("invert", () => {
    it("inverts vectors", () => {
      var vektar = Vektar.blow();
      vektar = vektar.invert();
      assert.equal(vektar, Vektar.emptyVector);

      vektar = Vektar.blow(1);
      vektar = vektar.invert();
      assert.equal(vektar.peek(), 1);
      assert.equal(vektar.skip(1), Vektar.emptyVector);

      vektar = vektar.push(2).push(3);
      assert.equal(vektar.peek(), 3);

      vektar = vektar.invert();
      assert.equal(vektar.peek(), 1);

      let oo = Vektar.blow(1,2,3);
      assert.equal(oo.toString(), "[1 2 3]");

      let xo = oo.invert();
      assert.equal(xo.toString(), "[3 2 1]");
    });
  });

  describe("map(vektar, fn)", () => {
    it("maps vektar through fn", ()=>{
      var vektar = Vektar.blow();

      let add7 = (vektar) => { return vektar + 7 };

      result = vektar.map(add7);
      assert.equal(result, Vektar.emptyVector);

      vektar = Vektar.blow(1);
      vektar = vektar.map(add7);
      assert.equal(vektar.get(), 8);

      vektar = vektar.push(2);
      vektar = vektar.map(add7);
      assert.equal(vektar.get(), 9);
      assert.equal(vektar.get(1), 15);

      vektar = vektar.push(3);
      vektar = vektar.map(add7);
      assert.equal(vektar.get(), 10);
      assert.equal(vektar.get(1), 16);
      assert.equal(vektar.get(2), 22);
    });
  });

  describe("push(vektar)", () => {
    it("pushes vektar ontvector the vektar.", () => {
      var vektar = Vektar.blow();

      vektar = vektar.push(1);
      assert.equal(vektar.get(), 1)
      assert.equal(vektar.skip(1), Vektar.emptyVector);

      vektar = vektar.push(2);
      assert.equal(vektar.get(), 2)
      assert.equal(vektar.get(1), 1)
      assert.equal(vektar.skip(2), Vektar.emptyVector);
    });
  });

  describe("reduce", () => {
    it("reduces the vektar", () => {
      var vektar = Vektar.blow(),
          result;

      let add = (a,b) => { return b + a };

      result = vektar.reduce(add);
      assert.equal(result, undefined);

      result = vektar.reduce(add, 0);
      assert.equal(result, 0);

      vektar = vektar.push(1);
      result = vektar.reduce(add);
      assert.equal(result, 1);

      vektar = vektar.push(2);
      result = vektar.reduce(add);
      assert.equal(result, 3);

      vektar = vektar.push(3),
      result = vektar.reduce(add)
      assert.equal(result, 6)

      vektar = Vektar.blow("a");
      result = vektar.reduce(add);
      assert.equal(result, "a");

      vektar = vektar.push("b");
      result = vektar.reduce(add);
      assert.equal(result, "ab");

      vektar = vektar.push("c");
      result = vektar.reduce(add);
      assert.equal(result, "abc");
    });
  });

  describe("vektar.skip(count)", () => {
    it("skips", () => {
      let vektar = Vektar.blow(6,7,8);
      assert.equal(vektar.skip().peek(), 8);
      assert.equal(vektar.skip(0).peek(), 8);
      assert.equal(vektar.skip(1).peek(), 7);
      assert.equal(vektar.skip(2).peek(), 6);
    });
  });

  describe("toString(vektar)", () => {
    it("formats vektar as a string.", () => {
      var vektar = Vektar.blow(),
        result;

      result = vektar.toString();
      assert.equal(result, "[]");

      vektar = Vektar.blow(1);
      result = vektar.toString();
      assert.equal(result, "[1]");

      vektar = vektar.push(2);
      result = vektar.toString();
      assert.equal(result, "[1 2]");

      vektar = vektar.push(3);
      result = vektar.toString();
      assert.equal(result, "[1 2 3]");

      vektar = vektar.push("string");
      result = vektar.toString();
      assert.equal(result, "[1 2 3 \"string\"]");

      vektar = vektar.push(Symbol.for("symbol"));
      result = vektar.toString();
      assert.equal(result, "[1 2 3 \"string\" symbol]");

      let oo = Vektar.blow(3,2,1);
      assert.equal(oo.toString(), "[3 2 1]");

      vektar = vektar.pop().pop().push(oo);
      assert.equal(vektar.toString(), "[1 2 3 [3 2 1]]");
    });
  });

  describe("split", function () {
    it("should split a vektar", function () {
      let sAmp = Ṣymbol.for("&");
      let vektar = Vektar.blow(1, 2, sAmp, 3);
      assert.equal(vektar.split(Ṣymbol.for("&")).toString(),
        "[[1 2] [3]]");
    });
  });

  describe("Symbol.iterator", () => {
    it("should not yield any values for an empty vektar (Vektar.emptyVector)", () => {
      const emptyVector = Vektar.emptyVector;
      const results = [...emptyVector];
      assert.deepEqual(results, []);

      let count = 0;
      for (const item of emptyVector) {
        count++;
      }
      assert.equal(count, 0, "for...of loop should not execute for Vektar.air");
    });

    it("should handle a vektar created by new Vektar() (yields initial undefined value)", () => {
      // A new Vektar() results in { o: undefined, oo: emptyVector }, which has isEmpty=false.
      // The iterator will yield the 'o' value.
      const vectorFromDefaultConstructor = new Vektar();
      const results = [...vectorFromDefaultConstructor];
      assert.deepEqual(results, [undefined], "Default constructor vektar should yield its undefined 'o' value");
    });

    it("should yield the single element for a single-element vektar", () => {
      const vektar = Vektar.blow(1); // Creates vektar: 1 -> emptyVector
      const expected = [1];

      const resultsForOf = [];
      for (const item of vektar) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch");

      const resultsSpread = [...vektar];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch");
    });

    it("should yield all elements in a multi-element vektar in order", () => {
      const vektar = Vektar.blow(1, 2, 3); // Creates vektar: 1 -> 2 -> 3 -> emptyVector
                                           // Note: Vektar.blow actually creates it as 3 -> 2 -> 1 -> emptyVector
                                           // The tests for blow() show: blow(1,2,3) -> vektar.get(0)=3, vektar.get(1)=2, vektar.get(2)=1
                                           // Svector the yielded order should be 3, 2, 1 for blow(1,2,3)
      const expected = [3, 2, 1];

      const resultsForOf = [];
      for (const item of vektar) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch for multi-element vektar");

      const resultsSpread = [...vektar];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch for multi-element vektar");
    });

    it("should correctly yield null and undefined values if they are part of the vektar", () => {
      const vektar = Vektar.blow(1, undefined, 3, null, 5); // Expected order: 5, null, 3, undefined, 1
      const expected = [5, null, 3, undefined, 1];

      const results = [...vektar];
      assert.deepEqual(results, expected, "Spread syntax results mismatch for vektar with null/undefined");
    });

    it("should not modify the original vektar during iteration", () => {
      const vektar = Vektar.blow("a", "b", "c"); // c -> b -> a
      const expectedItems = ["c", "b", "a"];
      const expectedToString = '["a" "b" "c"]'; // Based on typical toString for such a vektar structure

      // First iteration
      assert.deepEqual([...vektar], expectedItems, "First iteration results mismatch");

      // Check vektar integrity after iteration
      assert.equal(vektar.toString(), expectedToString, "Vektar string form changed after iteration");
      assert.equal(vektar.count(), 3, "Vektar count changed after iteration");
      assert.equal(vektar.peek(), "c", "Vektar head changed after iteration");

      // Second iteration
      assert.deepEqual([...vektar], expectedItems, "Second iteration results mismatch");
    });

    it("should allow multiple iterations independently", () => {
      const vektar = Vektar.blow("x", "y"); // y -> x
      const expected = ["y", "x"];

      const iterator1 = vektar[Symbol.iterator]();
      const iterator2 = vektar[Symbol.iterator]();

      assert.deepEqual(iterator1.next().value, "y");
      assert.deepEqual(iterator2.next().value, "y");
      assert.deepEqual(iterator1.next().value, "x");
      assert.deepEqual(iterator2.next().value, "x");
      assert.deepEqual(iterator1.next().done, true);
      assert.deepEqual(iterator2.next().done, true);
    });
  });
});
