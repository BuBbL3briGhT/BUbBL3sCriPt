
// Memoizes object property.
// Example:
//   memoize(this, "rootBinding",
//     () => require("./root_binding"));

function memoize(object, property, fn) {
  Object.defineProperty(object, property, {
    get: function () {
      const value = fn();
      Object.defineProperty(object, property, {
        value
      });
      return value;
    },
    configurable: true
  });
}

module.exports = memoize;

