const List = require("./list");
const Vector = require("./vector");
const Ṣymbol = require("./symbol");

let sAmp = Ṣymbol.for("&");

// TODO: Utility functions. Move to src/util
// directory.

// Applys the keys and the values to the
// binding based on order and position.
// Binding will be modified.
function applyArguments(binding, keys, vals) {
  if (keys instanceof Vector)
    keys = keys.toList();
  if (vals instanceof Vector)
    vals = vals.toList();

  // console.log("keys", keys);
  // console.log("vals", vals);
  while (!keys.isEmpty && !vals.isEmpty) {
    let key = keys.first;
    let val = vals.first;

    if (key == sAmp) {
      binding[keys.next] = vals;
      return binding;
    }

    if(val == sAmp) {
      applyArguments(binding, keys, vals.next)
      return binding;
    }

    switch (key.constructor) {
      case List:
      case Vector:
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
  let binding = Object.create(proto);
  applyArguments(binding, keys, values);
  return binding;
}

module.exports = createBinding;
