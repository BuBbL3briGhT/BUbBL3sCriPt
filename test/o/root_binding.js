const assert = require("assert");
const { rootBinding, List} = require("../../src/BubbleScript");

describe("rootBinding", function () {
   describe("get", function () {
     it.only("gets from object", function () {
       let obj = { name: "BubbleScript" };
       assert.equal(rootBinding
         .get(List.make(obj, "name")), "BubbleScript");
     });
   });
});
