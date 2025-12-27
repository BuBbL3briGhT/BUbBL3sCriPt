
import assert from "assert";
import sinon from "sinon";
import { ėval } from "../src/eval.js";
import { rootBinding } from "../src/binding.js";
import { List } from "../src/list.js"
import Fn from "../src/fn.js";

import { it as _it } from "mocha";


// Simple function that use a regex replacement to
// remove newlines and extra spaces and replace with
// a single space.
//
// Example:
//
//     const value = `Hello, how are you doing
//                    today my friend?`;
//
//     console.log(value);
//
//     Hello, how are you doing
//                    today my friend?
//
//     console.log(formatString(value));
//
//     Hello, how are you doing today my friend?";
//
function formatString(string) {
  return string.replace(/\W+/g, " ");
}

function it(title, ...etc) {
  return _it(formatString(title), ...etc);
}


// Describe define.
describe("define", function () {

  it("sets a value", function () {

    const binding = Object.create(rootBinding);

    assert.equal(ėval(binding, "🍎"), undefined);

    ėval(binding, `define 🍎 "apple"`);

    const result = ėval(binding, "🍎");

    assert.equal(result, "apple");

  });

  it(`doesn't define a value if it was already
      defined (value is constant).`, function () {

    const binding = Object.create(rootBinding);

    ėval(binding, `define 🍎 "apple"`);

    assert.throws(function () {
      ėval(binding, `define 🍎 "apple"`);
    }, Error);

  });

  it(`creates and sets a function when passed a
      list as the first parameter, and uses the
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


  // it(

  // it.skip(`extracts all key values from an
  //          ObjectMap in the current binding
  //          with *`, function () {
  //   const binding = Object.create(rootBinding);
  //   // TODO: Implement test.
  // });


});
