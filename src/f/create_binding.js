const List = require("../o/list");
const Vector = require("../o/vector");
const Ṣymbol = require("../o/symbol");

// Applys the keys and the values to the
// binding based on order and position.
// Binding will be modified.
function applyArguments(binding, keys, vals) {
  if (keys instanceof Vector)
    keys = keys.toList();
  if (vals instanceof Vector)
    vals = vals.toList();

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

function createBinding(proto, keys, values) {
  let binding = Object.create(proto);
  applyArguments(binding, keys, values);
  return binding;
}

module.exports = createBinding;
