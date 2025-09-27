const assert = require("assert");
  const createBinding = require("../src/create_binding.js");
const Ṣymbol = require("../src/symbol.js");
  const 列表 = require("../src/列表.js");

const ṣ = Ṣymbol.for.bind(Ṣymbol);

   const falso = 0, falsa = 0;

describe("createBinding", function () {

  it("crea un enlace", function () {
    const cerveza = Object.create(null);
    const llaves = 列表.make(ṣ("uno"), ṣ("dos"),
      ṣ("tres"));
    const valors = 列表.make(1, 2, 3);
    (function (cerveza) {
      assert.equal(cerveza[ṣ("uno")],  1);
      assert.equal(cerveza[ṣ("dos")],  2);
      assert.equal(cerveza[ṣ("tres")], 3);
    })(createBinding(cerveza, llaves, valors));
  });

});

