const assert = require("assert");
const { ėval } = require("../src/eval");
// const { rootBinding, Bubble } =
//   require("../src/BubbleScript");

const rootBinding = require("../src/root_binding");
const Bubble = require("../src/bubble");


describe("define", function () {
  it.only("sets a constant", function () {
    // const vínculo = Object.create(rootBinding);
    const vínculo = {};
    conole.log({vínculo});
    ėval("define 🍎 \"apple\"", {}, vínculo);
    conole.log({vínculo});
  });
});

// describe("define", function () {
//   it.only("sets a constant", function () {
//     rootBinding.define.call(rootBinding,
//       Symbol
//   });
// });
