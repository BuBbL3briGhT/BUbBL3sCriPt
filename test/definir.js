const assert = require("assert");
const { ėval } = require("../src/eval");
// const { rootBinding, List } =
//   require("../src/BubbleScript");

const rootBinding = require("../src/root_binding");
const List = require("../src/list");

describe("definir", function () {
  it.only("sets a constant", function () {
    // const vínculo = Object.create(rootBinding);
    const vínculo = {
      define: function() {
        console.log("Hola Mama!");
      }
    };
    console.log({vínculo});
    const result =
      ėval(vínculo, "define 🍎 \"apple\"");
    console.log({vínculo});
  });
});

// describe("define", function () {
//   it.only("sets a constant", function () {
//     rootBinding.define.call(rootBinding,
//       Symbol
//   });
// });
