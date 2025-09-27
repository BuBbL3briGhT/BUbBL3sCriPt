
// Memoizes object property.
// Example:
//   const object = {
//     get property() {
//       return "value";
//     }
//   }
//   memoize(object, "property");

function memoize(object, property) {
  // pesudo code, check this against actual js api.
  const descriptor =
    Object.getDescriptor(object, property);
  const funk = descriptor.get || descriptor.value;

  Object.defineProperty(object, property, {
    get: function () {
      const value = funk();
      Object.defineProperty(object, property, {
        value
      });
      return value;
    },
    configurable: true
  });
}

module.exports = memoize;

