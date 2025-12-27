
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

  it(`doesn't define a value if it was already \
      defined (value is constant).`, function () {

    const binding = Object.create(rootBinding);

    ėval(binding, `define 🍎 "apple"`);

    assert.throws(function () {
      ėval(binding, `define 🍎 "apple"`);
    }, Error);

  });

  it(`creates and sets a function when passed a \
      list as the first parameter, and uses the \
      remainder of the list as the body.`,
    function () {


    const binding = Object.create(rootBinding);

    binding["💜"] = sinon.fake();

    ėval(binding, "define (🐟) (💜)");

    assert.equal(binding["🐟"].constructor, Fn);

    ėval(binding, "(🐟)");

    assert.ok(binding["💜"].called,
       "💜 should have been called.");

  });


  it.skip(`extracts all key values from an \
           ObjectMap in the current binding \
           with *`, function () {
    const binding = Object.create(rootBinding);
    // TODO: Implement test.
  });



});
