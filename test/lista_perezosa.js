const assert = require("assert");
const ListaPerezosa = require("../src/lista_perezosa.js");
const Lista = require("../src/lista.js");

describe("ListaPerezosa", function () {
  it("is a lazzzy lista", function () {
    const expects = [1, 2, 3];
    const itty = expects[Symbol.iterator]();
    const lazy = new ListaPerezosa(itty);
    assert.deepEqual(expects, [...lazy]);
  });


  describe("#toList", function () {
    it("renders the lazy lista as a lista", function () {
      // const lazy = new ListaPerezosa([1,2,3][Symbol.iterator]());
      const lazy = new ListaPerezosa([1,2,3]);
      const actual = lazy.toList();
      const expected = Lista.blow(1, 2, 3);
      assert.deepEqual(actual, expected);
    });
  });
});

// for(const o of lista) {
// }
// const itty = [1, 2, 3];
// const lista = new ListaPerezosa([1, 2, 3]);
// assert.deepEqual([...lazy
// for(const o of lista) {
// }
