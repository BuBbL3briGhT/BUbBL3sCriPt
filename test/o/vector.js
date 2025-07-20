const assert = require("assert");
const Vector  = require("../../src/o/vector");

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

  // describe("new Vector(o, oo) ", () => {
  //   it("create a new vector for your fun and profit.", () => {
  //     var o;
  //     o = new Vector();
  //     assert.equal(get(o), undefined);
  //     assert.equal(skip(o, 1), Vector.emptyVector);

  //     o = new Vector(1);
  //     assert.equal(get(o), 1);
  //     o = new Vector(2, o);
  //     assert.equal(get(o), 2);
  //     assert.equal(get(o,1), 1);
  //   });
  // });

  // describe("make(o...)", () => {
  //   it("blows vectors", () => {
  //     assert.equal(make(), Vector.emptyVector);
  //     let o = make(1, 2, 3);
  //     assert.equal(get(o,0), 3);
  //     assert.equal(get(o,1), 2);
  //     assert.equal(get(o,2), 1);
  //   });
  // });

  // describe("count(o)", function () {
  //   it("counts", function () {
  //     let o = Vector.make(1, 2, 3);
  //     assert.equal(count(o), 3);
  //   });
  // });

  // describe("get(o, index)", () => {
  //   it("gets value of o at index", () => {
  //     let o = Vector.make(6,7,8);
  //     assert.equal(get(o, 0), 8);
  //     assert.equal(get(o, 1), 7);
  //     assert.equal(get(o, 2), 6);
  //   });
  // });

  // describe("invert", () => {
  //   it("inverts vectors", () => {
  //     var o = Vector.make();
  //     o = invert(o);
  //     assert.equal(o, Vector.emptyVector);

  //     o = make(1);
  //     o = invert(o);
  //     assert.equal(peek(o),1);
  //     assert.equal(skip(o,1), Vector.emptyVector);

  //     o = push(push(o,2),3);
  //     assert.equal(peek(o),3);

  //     o = invert(o);
  //     assert.equal(peek(o),1);

  //     let oo = make(1,2,3);
  //     assert.equal(Vector.toString(oo), "[1 2 3]");

  //     let xo = invert(oo);
  //     assert.equal(Vector.toString(xo), "[3 2 1]");
  //   });
  // });

  // describe("map(o, fn)", () => {
  //   it("maps o through fn", ()=>{
  //     var o = Vector.make();

  //     let add7 = (o) => { return o + 7 };

  //     result = map(o, add7);
  //     assert.equal(result, Vector.emptyVector);

  //     o = make(1);
  //     o = map(o, add7);
  //     assert.equal(get(o), 8);

  //     o = push(o, 2);
  //     o = map(o, add7);
  //     assert.equal(get(o), 9);
  //     assert.equal(get(o, 1), 15);

  //     o = push(o, 3);
  //     o = map(o, add7);
  //     assert.equal(get(o), 10);
  //     assert.equal(get(o, 1), 16);
  //     assert.equal(get(o, 2), 22);
  //   });
  // });

  // describe("push(o)", () => {
  //   it("pushes o onto the vector.", () => {
  //     var o = Vector.make();

  //     o = push(o, 1);
  //     assert.equal(get(o), 1)
  //     assert.equal(skip(o, 1), Vector.emptyVector);

  //     o = push(o, 2);
  //     assert.equal(get(o), 2)
  //     assert.equal(get(o, 1), 1)
  //     assert.equal(skip(o, 2), Vector.emptyVector);
  //   });
  // });

  // describe("reduce", () => {
  //   it("reduces the vector", () => {
  //     var o = Vector.make(),
  //         result;

  //     let add = (a,b) => { return b + a };

  //     result = reduce(o, add);
  //     assert.equal(result, undefined);

  //     result = reduce(o, add, 0);
  //     assert.equal(result, 0);

  //     o = push(o, 1);
  //     result = reduce(o, add);
  //     assert.equal(result, 1);

  //     o = push(o, 2);
  //     result = reduce(o, add);
  //     assert.equal(result, 3);

  //     o = push(o, 3),
  //     result = reduce(o, add)
  //     assert.equal(result, 6)

  //     o = make("a");
  //     result = reduce(o, add);
  //     assert.equal(result, "a");

  //     o = push(o, "b");
  //     result = reduce(o, add);
  //     assert.equal(result, "ab");

  //     o = push(o, "c");
  //     result = reduce(o, add);
  //     assert.equal(result, "abc");
  //   });
  // });

  // describe("skip(vector, count)", () => {
  //   it("skips", () => {
  //     let o = Vector.make(6,7,8);
  //     assert.equal(peek(skip(o)), 8);
  //     assert.equal(peek(skip(o,0)), 8);
  //     assert.equal(peek(skip(o,1)), 7);
  //     assert.equal(peek(skip(o,2)), 6);
  //   });
  // });

  // describe("toString(o)", () => {
  //   it("formats vector as a string.", () => {
  //     var o = Vector.make(),
  //       result;

  //     result = toString(o);
  //     assert.equal(result, "[]");

  //     o = make(1);
  //     result = toString(o);
  //     assert.equal(result, "[1]");

  //     o = push(o,2);
  //     result = toString(o);
  //     assert.equal(result, "[1 2]");

  //     o = push(o, 3);
  //     result = toString(o);
  //     assert.equal(result, "[1 2 3]");

  //     o = push(o, "string");
  //     result = toString(o);
  //     assert.equal(result, "[1 2 3 \"string\"]");

  //     o = push(o, Symbol.for("symbol"));
  //     result = toString(o);
  //     assert.equal(result, "[1 2 3 \"string\" symbol]");

  //     let ts = toString;
  //     let oo = make(3,2,1);
  //     assert.equal(ts(oo), "[3 2 1]");

  //     o = push(pop(pop(o)), oo);
  //     assert.equal(ts(o), "[1 2 3 [3 2 1]]");
  //   });
  // });

  // describe("Symbol.iterator", () => {
  //   it("should not yield any values for an empty vector (Vector.air)", () => {
  //     const emptyVector = Vector.emptyVector;
  //     const results = [...emptyVector];
  //     assert.deepEqual(results, []);

  //     let count = 0;
  //     for (const item of emptyVector) {
  //       count++;
  //     }
  //     assert.equal(count, 0, "for...of loop should not execute for Vector.air");
  //   });

  //   it("should handle a vector created by new Vector() (yields initial undefined value)", () => {
  //     // A new Vector() results in { o: undefined, oo: undefined }, which has x=false.
  //     // The iterator will yield the 'o' value.
  //     const vectorFromDefaultConstructor = new Vector();
  //     const results = [...vectorFromDefaultConstructor];
  //     assert.deepEqual(results, [undefined], "Default constructor vector should yield its undefined 'o' value");
  //   });

  //   it("should yield the single element for a single-element vector", () => {
  //     const vector = Vector.make(1); // Creates vector: 1 -> air
  //     const expected = [1];

  //     const resultsForOf = [];
  //     for (const item of vector) {
  //       resultsForOf.push(item);
  //     }
  //     assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch");

  //     const resultsSpread = [...vector];
  //     assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch");
  //   });

  //   it("should yield all elements in a multi-element vector in order", () => {
  //     const vector = Vector.make(1, 2, 3); // Creates vector: 1 -> 2 -> 3 -> air
  //                                          // Note: Vector.make actually creates it as 3 -> 2 -> 1 -> air
  //                                          // The tests for make() show: make(1,2,3) -> get(o,0)=3, get(o,1)=2, get(o,2)=1
  //                                          // So the yielded order should be 3, 2, 1 for make(1,2,3)
  //     const expected = [3, 2, 1];

  //     const resultsForOf = [];
  //     for (const item of vector) {
  //       resultsForOf.push(item);
  //     }
  //     assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch for multi-element vector");

  //     const resultsSpread = [...vector];
  //     assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch for multi-element vector");
  //   });

  //   it("should correctly yield null and undefined values if they are part of the vector", () => {
  //     const vector = Vector.make(1, undefined, 3, null, 5); // Expected order: 5, null, 3, undefined, 1
  //     const expected = [5, null, 3, undefined, 1];

  //     const results = [...vector];
  //     assert.deepEqual(results, expected, "Spread syntax results mismatch for vector with null/undefined");
  //   });

  //   it("should not modify the original vector during iteration", () => {
  //     const vector = Vector.make("a", "b", "c"); // c -> b -> a
  //     const expectedItems = ["c", "b", "a"];
  //     const expectedToString = '["a" "b" "c"]'; // Based on typical toString for such a vector structure

  //     // First iteration
  //     assert.deepEqual([...vector], expectedItems, "First iteration results mismatch");

  //     // Check vector integrity after iteration
  //     assert.equal(Vector.toString(vector), expectedToString, "Vector string form changed after iteration");
  //     assert.equal(Vector.count(vector), 3, "Vector count changed after iteration");
  //     assert.equal(Vector.peek(vector), "c", "Vector head changed after iteration");

  //     // Second iteration
  //     assert.deepEqual([...vector], expectedItems, "Second iteration results mismatch");
  //   });

  //   it("should allow multiple iterations independently", () => {
  //     const vector = Vector.make("x", "y"); // y -> x
  //     const expected = ["y", "x"];

  //     const iterator1 = vector[Symbol.iterator]();
  //     const iterator2 = vector[Symbol.iterator]();

  //     assert.deepEqual(iterator1.next().value, "y");
  //     assert.deepEqual(iterator2.next().value, "y");
  //     assert.deepEqual(iterator1.next().value, "x");
  //     assert.deepEqual(iterator2.next().value, "x");
  //     assert.deepEqual(iterator1.next().done, true);
  //     assert.deepEqual(iterator2.next().done, true);
  //   });
  // });
});
