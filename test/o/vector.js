const assert = require("assert");
const { Vector, Symbol: _Symbol }  = require("../../src/BubbleScript");

describe("Vector", () => {

  describe("emptyVector", function () {
    describe("toString", function () {
      it("should return a formatted string representation of an empty vector", function () {
        let emptyVector = Vector.emptyVector
        assert.equal(emptyVector.toString(), "[]");
      });
    });
  });

  describe("isEmpty", function () {
    it("should return true for an empty vector", function () {
      let vector = Vector.make();
      assert.equal(vector.isEmpty, true);
    });
    it("should return false for a none empty vector", function () {
      let vector = Vector.make(1);
      assert.equal(vector.isEmpty, false);
    });
  });

  describe("toString", function () {
    it("returns the expected string representation", function () {
      let vector = Vector.make(1, 2, 3);
      assert.equal(vector.toString(), "[1 2 3]");
    });
  });

  describe("new Vector(o, oo) ", () => {
    it("create a new vector for your fun and profit.", () => {
      var vector;
      vector = new Vector();
      assert.equal(vector.get(), undefined);
      assert.equal(vector.skip(1), Vector.emptyVector);

      vector = new Vector(1);
      assert.equal(vector.get(), 1);
      vector = new Vector(2, vector);
      assert.equal(vector.get(), 2);
      assert.equal(vector.get(1), 1);
    });
  });

  describe("make(o...)", () => {
    it("makes a vector", () => {
      assert.equal(Vector.make(), Vector.emptyVector);
      let vector = Vector.make(1, 2, 3);
      assert.equal(vector.get(0), 3);
      assert.equal(vector.get(1), 2);
      assert.equal(vector.get(2), 1);
    });
  });

  describe("count(o)", function () {
    it("counts", function () {
      let vector = Vector.make(1, 2, 3);
      assert.equal(vector.count(), 3);
    });
  });

  describe("get(o, index)", () => {
    it("gets value of o at index", () => {
      let vector = Vector.make(6,7,8);
      assert.equal(vector.get(0), 8);
      assert.equal(vector.get(1), 7);
      assert.equal(vector.get(2), 6);
    });
  });

  describe("invert", () => {
    it("inverts vectors", () => {
      var vector = Vector.make();
      vector = vector.invert();
      assert.equal(vector, Vector.emptyVector);

      vector = Vector.make(1);
      vector = vector.invert();
      assert.equal(vector.peek(), 1);
      assert.equal(vector.skip(1), Vector.emptyVector);

      vector = vector.push(2).push(3);
      assert.equal(vector.peek(), 3);

      vector = vector.invert();
      assert.equal(vector.peek(), 1);

      let oo = Vector.make(1,2,3);
      assert.equal(oo.toString(), "[1 2 3]");

      let xo = oo.invert();
      assert.equal(xo.toString(), "[3 2 1]");
    });
  });

  describe("map(vector, fn)", () => {
    it("maps vector through fn", ()=>{
      var vector = Vector.make();

      let add7 = (vector) => { return vector + 7 };

      result = vector.map(add7);
      assert.equal(result, Vector.emptyVector);

      vector = Vector.make(1);
      vector = vector.map(add7);
      assert.equal(vector.get(), 8);

      vector = vector.push(2);
      vector = vector.map(add7);
      assert.equal(vector.get(), 9);
      assert.equal(vector.get(1), 15);

      vector = vector.push(3);
      vector = vector.map(add7);
      assert.equal(vector.get(), 10);
      assert.equal(vector.get(1), 16);
      assert.equal(vector.get(2), 22);
    });
  });

  describe("push(vector)", () => {
    it("pushes vector ontvector the vector.", () => {
      var vector = Vector.make();

      vector = vector.push(1);
      assert.equal(vector.get(), 1)
      assert.equal(vector.skip(1), Vector.emptyVector);

      vector = vector.push(2);
      assert.equal(vector.get(), 2)
      assert.equal(vector.get(1), 1)
      assert.equal(vector.skip(2), Vector.emptyVector);
    });
  });

  describe("reduce", () => {
    it("reduces the vector", () => {
      var vector = Vector.make(),
          result;

      let add = (a,b) => { return b + a };

      result = vector.reduce(add);
      assert.equal(result, undefined);

      result = vector.reduce(add, 0);
      assert.equal(result, 0);

      vector = vector.push(1);
      result = vector.reduce(add);
      assert.equal(result, 1);

      vector = vector.push(2);
      result = vector.reduce(add);
      assert.equal(result, 3);

      vector = vector.push(3),
      result = vector.reduce(add)
      assert.equal(result, 6)

      vector = Vector.make("a");
      result = vector.reduce(add);
      assert.equal(result, "a");

      vector = vector.push("b");
      result = vector.reduce(add);
      assert.equal(result, "ab");

      vector = vector.push("c");
      result = vector.reduce(add);
      assert.equal(result, "abc");
    });
  });

  describe("vector.skip(count)", () => {
    it("skips", () => {
      let vector = Vector.make(6,7,8);
      assert.equal(vector.skip().peek(), 8);
      assert.equal(vector.skip(0).peek(), 8);
      assert.equal(vector.skip(1).peek(), 7);
      assert.equal(vector.skip(2).peek(), 6);
    });
  });

  describe("toString(vector)", () => {
    it("formats vector as a string.", () => {
      var vector = Vector.make(),
        result;

      result = vector.toString();
      assert.equal(result, "[]");

      vector = Vector.make(1);
      result = vector.toString();
      assert.equal(result, "[1]");

      vector = vector.push(2);
      result = vector.toString();
      assert.equal(result, "[1 2]");

      vector = vector.push(3);
      result = vector.toString();
      assert.equal(result, "[1 2 3]");

      vector = vector.push("string");
      result = vector.toString();
      assert.equal(result, "[1 2 3 \"string\"]");

      vector = vector.push(Symbol.for("symbol"));
      result = vector.toString();
      assert.equal(result, "[1 2 3 \"string\" symbol]");

      let oo = Vector.make(3,2,1);
      assert.equal(oo.toString(), "[3 2 1]");

      vector = vector.pop().pop().push(oo);
      assert.equal(vector.toString(), "[1 2 3 [3 2 1]]");
    });
  });

  describe("split", function () {
    it("should split a vector", function () {
      let sAmp = _Symbol.for("&");
      let vector = Vector.make(1, 2, sAmp, 3);
      assert.equal(vector.split(_Symbol.for("&")).toString(),
        "[[1 2] [3]]");
    });
  });

  describe("Symbol.iterator", () => {
    it("should not yield any values for an empty vector (Vector.emptyVector)", () => {
      const emptyVector = Vector.emptyVector;
      const results = [...emptyVector];
      assert.deepEqual(results, []);

      let count = 0;
      for (const item of emptyVector) {
        count++;
      }
      assert.equal(count, 0, "for...of loop should not execute for Vector.air");
    });

    it("should handle a vector created by new Vector() (yields initial undefined value)", () => {
      // A new Vector() results in { o: undefined, oo: emptyVector }, which has isEmpty=false.
      // The iterator will yield the 'o' value.
      const vectorFromDefaultConstructor = new Vector();
      const results = [...vectorFromDefaultConstructor];
      assert.deepEqual(results, [undefined], "Default constructor vector should yield its undefined 'o' value");
    });

    it("should yield the single element for a single-element vector", () => {
      const vector = Vector.make(1); // Creates vector: 1 -> emptyVector
      const expected = [1];

      const resultsForOf = [];
      for (const item of vector) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch");

      const resultsSpread = [...vector];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch");
    });

    it("should yield all elements in a multi-element vector in order", () => {
      const vector = Vector.make(1, 2, 3); // Creates vector: 1 -> 2 -> 3 -> emptyVector
                                           // Note: Vector.make actually creates it as 3 -> 2 -> 1 -> emptyVector
                                           // The tests for make() show: make(1,2,3) -> vector.get(0)=3, vector.get(1)=2, vector.get(2)=1
                                           // Svector the yielded order should be 3, 2, 1 for make(1,2,3)
      const expected = [3, 2, 1];

      const resultsForOf = [];
      for (const item of vector) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch for multi-element vector");

      const resultsSpread = [...vector];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch for multi-element vector");
    });

    it("should correctly yield null and undefined values if they are part of the vector", () => {
      const vector = Vector.make(1, undefined, 3, null, 5); // Expected order: 5, null, 3, undefined, 1
      const expected = [5, null, 3, undefined, 1];

      const results = [...vector];
      assert.deepEqual(results, expected, "Spread syntax results mismatch for vector with null/undefined");
    });

    it("should not modify the original vector during iteration", () => {
      const vector = Vector.make("a", "b", "c"); // c -> b -> a
      const expectedItems = ["c", "b", "a"];
      const expectedToString = '["a" "b" "c"]'; // Based on typical toString for such a vector structure

      // First iteration
      assert.deepEqual([...vector], expectedItems, "First iteration results mismatch");

      // Check vector integrity after iteration
      assert.equal(vector.toString(), expectedToString, "Vector string form changed after iteration");
      assert.equal(vector.count(), 3, "Vector count changed after iteration");
      assert.equal(vector.peek(), "c", "Vector head changed after iteration");

      // Second iteration
      assert.deepEqual([...vector], expectedItems, "Second iteration results mismatch");
    });

    it("should allow multiple iterations independently", () => {
      const vector = Vector.make("x", "y"); // y -> x
      const expected = ["y", "x"];

      const iterator1 = vector[Symbol.iterator]();
      const iterator2 = vector[Symbol.iterator]();

      assert.deepEqual(iterator1.next().value, "y");
      assert.deepEqual(iterator2.next().value, "y");
      assert.deepEqual(iterator1.next().value, "x");
      assert.deepEqual(iterator2.next().value, "x");
      assert.deepEqual(iterator1.next().done, true);
      assert.deepEqual(iterator2.next().done, true);
    });
  });
});
