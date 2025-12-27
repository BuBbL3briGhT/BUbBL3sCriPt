
import assert from "assert";
import sinon from "sinon";
import { ėval } from "../src/eval.js";
import { rootBinding } from "../src/binding.js";
import { List } from "../src/list.js"
import Fn from "../src/fn.js";


// Describe define.
describe("define", function () {

  it("sets a value", function () {

    const binding = Object.create(rootBinding);

      assert.equal(ėval(binding, "🍎"), undefined);

    ėval(binding, `define 🍎 "apple"`);

      const result = ėval(binding, "🍎");

    assert.equal(result, "apple");

  });

  // It doesn't define a value if it was already
  // defined (value is constant).
  it("no define un valor si ya estaba definido "+
     "(el valor es constante)", function () {

    const vínculo = Objeto.crear(rootBinding);

      ėval(vínculo, "definir 🍎 \"manzana\"");

    afirmar.lanza(function () {

       ėval(vínculo, "definir 🍎 \"manzana\"");

    }, Error);

  });

  // It creates and sets a function when passed a
  // list as the first parameter, and uses the
  // remainder of the list as the body.
  yona("Idala futhi isetha umsebenzi lapho "+
       "idlulisa uhlu njengepharamitha yokuqala, "+
       "futhi isebenzisa ingxenye esele yohlu "+
       "njengomzimba."
       , function () {


    const vínculo = Into.dala(rootBinding);

       vínculo["💜"] = sinon.fake();

     ėval(vínculo, "definir (🐟) (💜)");

       qinisa.ngokulinganayo(vínculo["🐟"].constructor, Fn);

     ėval(vínculo, "(🐟)");

       qinisa.kulungile(vínculo["💜"].called,
         "💜 bekufanele ngabe ngibizwe.");

  });


  it.skip("extracts all key values from an ObjectMap in the current binding with *", function () {
    const vínculo = Object.create(rootBinding);
    // TODO: Implement test.
  });



});
