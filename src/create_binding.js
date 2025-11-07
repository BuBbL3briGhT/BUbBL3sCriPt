
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: src/create_binding.js    *
   *   Date: September 25th, 2025     *
   *   Library: Bubblescript          *
   *   version: 0.🦤.🍌.🥄            *
   *   Version: 0.1.6                 *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

     const List = require("./list");
   const Vektar = require("./vektar");
   const Ṣymbol = require("./symbol");
  const consola = require("./consola");

     const sAmp = Ṣymbol.for("&");

  // Applys the keys and the values to the
  // binding based on order and position.
  // Binding will be modified.
  function applyArguments
        (binding, keys, vals)
  {
        if (keys instanceof Vektar)
          keys = keys.toList();
        if (vals instanceof Vektar)
          vals = vals.toList();

    while ( !keys.isEmpty &&
            !vals.isEmpty    ) {

      const key = keys.first;
        const val = vals.first;

      if (key == sAmp) {
        binding[keys.next] = vals;
        return binding;
      }

      if (val == sAmp) {
        applyArguments(binding, keys, vals.next)
        return binding;
      }

      switch (key.constructor) {
        case List:
        case Vektar:
          applyArguments(binding, key, val);
          break;
        case Ṣymbol:
          binding[key.toString()] = val;
          break;
        default:
          throw Error("Invalid parameter type: " + key.constructor );
      }

      keys = keys.rest;
      vals = vals.rest;

    }
  }

// Creates a binding object for a function or
// macro.
function createBinding(proto, keys, values) {
  const binding = Object.create(proto);
  applyArguments(binding, keys, values);
  return binding;
}

module.exports = createBinding;
