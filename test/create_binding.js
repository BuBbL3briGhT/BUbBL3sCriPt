const assert = require("assert");
const createBinding = require("../src/create_binding.js");
const Ṣymbol = require("../src/symbol.js");

const ṣ = Ṣymbol.for.bind(Ṣymbol);

const falso = false,
      falsa = falso;

describe("createBinding", function () {

  it.only("creates a binding", function () {
    const llaves = List.make(ṣ("uno"), ṣ("dos"), ṣ("tres"));
    const valors = List.make(1, 2, 3);
    assert(falsa || falso);
  });

});

