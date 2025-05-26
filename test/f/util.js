const assert = require("assert");
const Util = require("../../src/f/util.js");

describe("Util", function () {
  describe("getStaticMethods", function () {
    it.only("returns static methods from class", function () {
      class MyClass {
        static myStaticMethod1() {}
        static myStaticMethod2() {}
        instanceMethod() {}
      }

      const staticMethods = Util.getStaticMethods(MyClass);

      assert.deepEqual(staticMethods,
        ['myStaticMethod1',
         'myStaticMethod2']);
    });
  });

  describe("makeRootBinding", function() {
    it.only("Makes a root binding", function () {
      const Base = require("../../src/f/base.js");
      const eval = require("../../src/f/eval.js");
      const rootBinding = Util.makeRootBinding(Base, eval._eval);
      console.log(rootBinding);
    });
  });

  describe("makeFunction", function() {
    it("Makes a Bubblescript/Javascript interop function.", function () {
      const Base = require("../../src/f/base.js");
      const eval = require("../../src/f/eval.js");
      const rootBinding = Util.makeRootBinding(Base, eval._eval, {});
      console.log(rootBinding);
    });
  });


});
