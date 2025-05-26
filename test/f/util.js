const assert = require("assert");
const Util = require("../../src/f/util.js");

describe("Util", function () {
  describe("getStaticMethods", function () {
    it("returns static methods from class", function () {
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
    it("Makes a root binding", function () {
      function assertFunction(fn) {
        assert.equal(typeof fn, 'function');
      }
      const Base = require("../../src/f/base.js");
      const eval = require("../../src/f/eval.js");
      const rootBinding =
        Util.makeRootBinding(Base, eval._eval);

      const functions = Util.getStaticMethods(Base);
      for (const fn of functions) {
        assert(rootBinding[fn]);
        assertFunction(rootBinding[fn]);
      }

      assert(rootBinding["not"]);
      assertFunction(rootBinding["not"]);
      // console.debug(rootBinding);
    });
  });

  describe("makeFunction", function() {
    it("Makes a Bubblescript/Javascript interop function.", function () {
      const eval = require("../../src/f/eval.js");
      const _fn = (_) => _; // Simple pass thru function for test.
      const fn = Util.
        makeFunction(_fn, eval.eVaL);
      assert.deepEqual(fn(1, 2, 3),
        [1, 2, 3]);
    });
  });

});
