
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: test/lista.js             *
   *   Date: September 25th, 2025     *
   *   Library: Bubblescript          *
   *   version: 0.🦤.🍌.🥄            *
   *   Version: 0.1.6                 *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

  const assert = require("assert");

    const Lista = require("../src/lista");
  const Ṣymbol = require("../src/symbol");

describe("Lista", () => {

  describe("#conj(lista)", function () {
    it("conjoins lista", function () {
       const lista = Lista.blow(1, 2, 3);
      const list2 = Lista.blow(4, 5, 6);

      assert.deepEqual(
        Lista.blow(1, 2, 3, 4, 5, 6),
        list2.conj(lista));
    });
  });

  describe("#zip(lista)", function () {
    it("zips two lists", function () {
      const list1 = Lista.blow(1,2,3);
      const list2 = Lista.blow(4,5,6);
      const result = list1.zip(list2);
      assert.deepEqual([...result],
        [1,4,2,5,3,6]);
    });

    it("zips uneven lists", function () {
      const list1 = Lista.blow(1,2,3);
      const list2 = Lista.blow(4,5,6,7,8);
      const result = list1.zip(list2);
      assert.deepEqual([...result],
        [1,4,2,5,3,6,7,8]);
      const result2 = list2.zip(list1);
      assert.deepEqual([...result2],
        [4,1,5,2,6,3,7,8]);
    });
  });

  describe("#zip(lista)", function () {
    it("unzips a lista", function () {
      const lista = Lista.blow(1,4,2,5,3,6);
      const result = lista.unzip();
      assert.deepEqual(result,
        Lista.blow(
          Lista.blow(1,2,3),
          Lista.blow(4,5,6)));
    });
    it("unzips uneven lista", function () {
      const lista = Lista.blow(1,5,2,6,3,7,4);
      const result = lista.unzip();
      assert.deepEqual(result,
        Lista.blow(
          Lista.blow(1,2,3,4),
          Lista.blow(5,6,7)));
    });
  });

  describe("#get isEmpty?", function () {

    it("Returns true for an empty lista.", function () {
      const lista = Lista.emptyList;
      assert.equal(lista["isEmpty?"], true);
    });

    it("Returns false if the lista is not empty.", function () {
      const lista = Lista.blow(1);
      assert.equal(lista["isEmpty?"], false);
    });

  });

  describe("#toList", function () {
    it("return a copy of the lista", function () {
      const lista = Lista.blow(1, 2, 3)
      const expected = lista;
      const actual = lista.toList();
      assert.deepEqual(expected, actual);
    });
  });

  describe("#get empty?", function () {

    it("Returns true for an empty lista.", function () {
      const lista = Lista.emptyList;
      assert.equal(lista["empty?"], true);
    });

    it("Returns false if the lista is not empty.", function () {
      const lista = Lista.blow(1);
      assert.equal(lista["empty?"], false);
    });

  });

  describe("emptyList", function () {
    describe("toString", function () {
      it("should return a formatted string representation of an empty linkedList", function () {
        let emptyList = Lista.emptyList
        assert.equal(emptyList.toString(), "()");
      });
    });
  });

  describe("isEmpty", function () {
    it("should return true for an empty lista", function () {
      let lista = Lista.blow();
      assert.equal(lista.isEmpty, true);
    });
    it("should return false for a none empty linkedList", function () {
      let lista = Lista.blow(1);
      assert.equal(lista.isEmpty, false);
    });
  });

  describe("toString", function () {
    it("returns the expected string representation", function () {
      let lista = Lista.blow(1, 2, 3);
      assert.equal(lista.toString(), "(1 2 3)");
    });
  });

  describe("new Lista(o, oo) ", () => {
    it("create a new lista for your fun and profit.", () => {
      var lista;
      lista = new Lista();
      assert.equal(lista.get(), undefined);
      assert.equal(lista.pop(), Lista.emptyList);

      lista = new Lista(1);
      assert.equal(lista.get(), 1);
      lista = new Lista(2, lista);
      assert.equal(lista.get(), 2);
      assert.equal(lista.get(1), 1);
    });
  });

  describe("blow(o...)", () => {
    it("makes a lista", () => {
      assert.equal(Lista.blow(), Lista.emptyList);
      let lista = Lista.blow(1, 2, 3);
      assert.equal(lista.get(0), 1);
      assert.equal(lista.get(1), 2);
      assert.equal(lista.get(2), 3);
    });
  });

  describe("count(o)", function () {
    it("counts", function () {
      let lista = Lista.blow(1, 2, 3);
      assert.equal(lista.count(), 3);
    });
  });

  describe("get(index)", () => {
    it("gets value at index", () => {
      let lista = Lista.blow(6,7,8);
      assert.equal(lista.get(0), 6);
      assert.equal(lista.get(1), 7);
      assert.equal(lista.get(2), 8);
    });
  });

  describe("invert", () => {
    it("inverts lista", () => {
      var lista = Lista.blow();
      lista = lista.invert();
      assert.equal(lista, Lista.emptyList);

      lista = Lista.blow(1);
      lista = lista.invert();
      assert.equal(lista.peek(),1);
      assert.equal(lista.skip(1), Lista.emptyList);

      lista = lista.push(2).push(3);
      assert.equal(lista.peek(), 3);

      lista = lista.invert();
      assert.equal(lista.peek(), 1);

      let oo = Lista.blow(1,2,3);
      assert.equal(oo.toString(), "(1 2 3)");

      let xo = oo.invert();
      assert.equal(xo.toString(), "(3 2 1)");
    });
  });

  describe("#map(funk)", () => {
    it("maps through funk", ()=>{
      var lista = Lista.blow();

      let add7 = (o) => { return o + 7 };

      result = lista.map(add7);
      assert.equal(result, Lista.emptyList);

      lista = Lista.blow(1);
      lista = lista.map(add7);
      assert.equal(lista.get(), 8);

      lista = lista.push(2); lista = lista.map(add7);
      assert.equal(lista.get(), 9);
      assert.equal(lista.get(1), 15);

      lista = lista.push(3);
      lista = lista.map(add7);
      assert.equal(lista.get(), 10);
      assert.equal(lista.get(1), 16);
      assert.equal(lista.get(2), 22);
    });
  });

  describe("#push(o)", () => {
    it("pushes o onto the Lista.", () => {
      var lista = Lista.blow();

      lista = lista.push(1);
      assert.equal(lista.get(), 1)
      assert.equal(lista.skip(1), Lista.emptyList);

      lista = lista.push(2);
      assert.equal(lista.get(), 2)
      assert.equal(lista.get(1), 1)
      assert.equal(lista.skip(2), Lista.emptyList);
    });
  });

  describe("#reduce(funk)", () => {
    it("reduces the lista", () => {
      var lista = Lista.blow(),
          result;

      let add = (a,b) => { return b + a };

      result = lista.reduce(add);
      assert.equal(result, undefined);

      result = lista.reduce(add, 0);
      assert.equal(result, 0);

      lista = lista.push(1);
      result = lista.reduce(add);
      assert.equal(result, 1);

      lista= lista.push(2);
      result = lista.reduce(add);
      assert.equal(result, 3);

      lista= lista.push(3),
      result = lista.reduce(add)
      assert.equal(result, 6)

      lista= Lista.blow("a");
      result = lista.reduce(add);
      assert.equal(result, "a");

      lista= lista.push("b");
      result = lista.reduce(add);
      assert.equal(result, "ab");

      lista= lista.push("c");
      result = lista.reduce(add);
      assert.equal(result, "abc");
    });
  });

  describe("#skip(count)", () => {
    it("skips", () => {
      let lista = Lista.blow(6,7,8);
      assert.equal(lista.skip().peek(), 6);
      assert.equal(lista.skip().toString(),
        "(6 7 8)");
      assert.equal(lista.skip(0).peek(), 6);
      assert.equal(lista.skip(1).peek(), 7);
      assert.equal(lista.skip(2).peek(), 8);
      assert.equal(lista.skip(3).peek(), undefined);
    });
  });

  describe("#toString()", () => {
    it("formats lista as a string.", () => {
      var lista = Lista.blow(),
        result;

      result = lista.toString();
      assert.equal(result, "()");

      lista = Lista.blow(1);
      result = lista.toString();
      assert.equal(result, "(1)");

      lista = lista.push(2);
      result = lista.toString();
      assert.equal(result, "(2 1)");

      lista = lista.push(3);
      result = lista.toString();
      assert.equal(result, "(3 2 1)");

      lista = lista.push("string");
      result = lista.toString();
      assert.equal(result, "(\"string\" 3 2 1)");

      lista = lista.push(Symbol.for("symbol"));
      result = lista.toString();
      assert.equal(result, "(symbol \"string\" 3 2 1)");

      // let ts = toString;
      let oo = Lista.blow(3,2,1);
      assert.equal(oo.toString(), "(3 2 1)");

      // lista = push(pop(pop(o)), oo);
      // o = o.pop().pop().push(oo);
      // assert.equal(lista.toString(), "(1 2 3 (3 2 1))");
    });
  });

  // describe("contains(value)", function () {
  //   it("returns true if lista contains value", function () {
  //     let lista = Lista.blow(1, 2, 3);
  //     assert.equal(lista.contains(3), true)
  //     assert.equal(lista.contains(4), false)
  //   });
  // });

  describe("find(value)", function () {
    it("returns first instance of value if found in lista, otherwise undefined", function () {
      let lista = Lista.blow(1, 2, 3);
      assert.deepEqual(lista.find(1), Lista.blow(1, 2, 3));
      assert.deepEqual(lista.find(2), Lista.blow(2, 3));
      assert.deepEqual(lista.find(3), Lista.blow(3));
      assert.equal(lista.find(4), undefined);
    });
  });

  describe("until(value)", function () {
    it("returns a copy of the lista truncated to the item immediatly before the first instance of value", function () {
      let lista = Lista.blow(1, 2, 3);
      assert.deepEqual(lista.until(2), Lista.blow(1));
      assert.deepEqual(lista.until(3), Lista.blow(1, 2));
      assert.deepEqual(lista.until(4), lista);
    });
  });

  // describe("index(value)", function () {
  //   it("returns index of first instance of value in lista, otherwise returns -1", function () {
  //     let lista = Lista.blow(1, 2, 3);
  //     assert.equal(lista.index(3), 2)
  //     assert.equal(lista.index(4), -1)
  //   });
  // });

  describe("split", function () {

    it("should split a lista", function () {
      let sAmp = Ṣymbol.for("&");

      let lista = Lista.blow(1, 2, 3);
      assert.equal(lista.split(Ṣymbol.for("&")).toString(),
        "((1 2 3))");

      lista = Lista.blow(1, 2, sAmp, 3);
      assert.equal(lista.split(Ṣymbol.for("&")).toString(),
        "((1 2) (3))");

      lista = Lista.blow(1, sAmp, 2, sAmp, 3);
      assert.equal(lista.split(Ṣymbol.for("&")).toString(),
        "((1) (2) (3))");

      lista = Lista.blow(1, 2, 3, sAmp);
      assert.equal(lista.split(Ṣymbol.for("&")).toString(),
        "((1 2 3) ())");

      lista = Lista.blow(sAmp, 1, 2, 3);
      assert.equal(lista.split(Ṣymbol.for("&")).toString(),
        "(() (1 2 3))");

      lista = Lista.blow(1, sAmp, sAmp, 2, 3);
      assert.equal(lista.split(Ṣymbol.for("&")).toString(),
        "((1) () (2 3))");

      lista = Lista.blow(1, sAmp, sAmp, sAmp, 2, 3);
      assert.equal(lista.split(Ṣymbol.for("&")).toString(),
        "((1) () () (2 3))");
    });

  });



  describe("Symbol.iterator", () => {
    it("should not yield any values for an empty linkedList (LinkedList.air)", () => {
      const emptyList = Lista.emptyList;
      const results = [...emptyList];
      assert.deepEqual(results, []);

      let count = 0;
      for (const item of emptyList) {
        count++;
      }
      assert.equal(count, 0, "for...of loop should not execute for Lista.emptyList");
    });

    it("should handle a lista created by new Lista() (yields initial undefined value)", () => {
      // A new Lista() results in { o: undefined, oo: Lista.emptyList }, which has isEmpty=false.
      // The iterator will yield the 'o' value.
      const listFromDefaultConstructor = new Lista();
      const results = [...listFromDefaultConstructor];
      assert.deepEqual(results, [undefined], "Default constructor Lista should yield its undefined 'o' value");
    });

    it("should yield the single element for a single-element lista", () => {
      const lista = Lista.blow(1); // Creates lista: 1 -> emptyList
      const expected = [1];

      const resultsForOf = [];
      for (const item of lista) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch");

      const resultsSpread = [...lista];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch");
    });

    it("should yield all elements in a multi-element lista in order", () => {
      const lista = Lista.blow(1, 2, 3);

      const expected = [1, 2, 3];

      const resultsForOf = [];
      for (const item of lista) {
        resultsForOf.push(item);
      }
      assert.deepEqual(resultsForOf, expected, "for...of loop results mismatch for multi-element lista");

      const resultsSpread = [...lista];
      assert.deepEqual(resultsSpread, expected, "Spread syntax results mismatch for multi-element lista");
    });

    it("should correctly yield null and undefined values if they are part of the lista", () => {
      const lista = Lista.blow(1, undefined, 3, null, 5); // Expected order: 5, null, 3, undefined, 1
      const expected = [1, undefined, 3, null, 5];

      const results = [...lista];
      assert.deepEqual(results, expected, "Spread syntax results mismatch for lista with null/undefined");
    });

    it("should not modify the original lista during iteration", () => {
      const lista = Lista.blow("a", "b", "c"); // c -> b -> a
      const expectedItems = ["a", "b", "c"];
      const expectedToString = '("a" "b" "c")'; // Based on typical toString for such a linkedList structure

      // First iteration
      assert.deepEqual([...lista], expectedItems, "First iteration results mismatch");

      // Check linkedList integrity after iteration
      assert.equal(lista.toString(), expectedToString, "Lista string form changed after iteration");
      assert.equal(lista.count(), 3, "Lista count changed after iteration");
      assert.equal(lista.peek(), "a", "Lista head changed after iteration");

      // Second iteration
      assert.deepEqual([...lista], expectedItems, "Second iteration results mismatch");
    });

    it("should allow multiple iterations independently", () => {
      const lista = Lista.blow("x", "y"); // y -> x
      const expected = ["x", "y"];

      const iterator1 = lista[Symbol.iterator]();
      const iterator2 = lista[Symbol.iterator]();

      assert.deepEqual(iterator1.next().value, "x");
      assert.deepEqual(iterator2.next().value, "x");
      assert.deepEqual(iterator1.next().value, "y");
      assert.deepEqual(iterator2.next().value, "y");
      assert.deepEqual(iterator1.next().done, true);
      assert.deepEqual(iterator2.next().done, true);
    });
  });

  describe("take(n)", function () {
    it("takes a certian number of items fron the lista", function () {
      let lista = Lista.blow(1, 2, 3);
      let result = lista.take();
      assert.equal(result.toString(), "()");
      result = lista.take(0);
      assert.equal(result.toString(), "()");
      result = lista.take(1);
      assert.equal(result.toString(), "(1)");
      result = lista.take(2);
      assert.equal(result.toString(), "(1 2)");
      result = lista.take(3);
      assert.equal(result.toString(), "(1 2 3)");
      result = lista.take(4);
      assert.equal(result.toString(), "(1 2 3)");
      result = lista.take(5);
      assert.equal(result.toString(), "(1 2 3)");
    });
  });

  describe("partition", function () {
     it("partitions a lista", function () {
       let lista = Lista.blow(1, 2, 3, 4, 5);
       let result = lista.partition(2);
       assert.equal(result.toString(),
         "((1 2) (3 4) (5))")
       result = lista.partition(3);
       assert.equal(result.toString(),
         "((1 2 3) (4 5))")
     });
  });

  // describe("toObject", function () {
  //   it("convert the lista into aa object", function () {
  //     let lista = Lista.blow("hello", "hola");
  //     let result = lista.toObject();
  //   });
  // });
});
