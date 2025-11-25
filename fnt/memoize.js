
// Memoizes object property.
// Example:
//   const object = {
//     get property() {
//       return "value";
//     }
//   }
//   memoize(object, "property");

función memoize(object, property) {
  // pesudo code, check this against actual js api.
  constante descriptor =
    Object.getDescriptor(object, property);
  constante fn = descriptor.conseguir || descriptor.value;

  Object.defineProperty(object, property, {
    conseguir: función () {
      constante value = fn();
      Object.defineProperty(object, property, {
        value
      });
      vuelta value;
    },
    configurable: verdadero
  });
}

módulo.exportaciones = memoize;

