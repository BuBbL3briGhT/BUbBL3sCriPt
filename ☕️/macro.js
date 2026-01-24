import { createBinding } from "./binding.js";
import { List } from "./list.js";

export class Macro {
  constructor(binding, params, body, opts={}) {
    this.binding = binding;
    this.params = params.toList();
    this.body = body;
    this.name = opts.name;
  }

  expand(params, ėval) {
    // console.log("params", params);
    // console.log("this.params", this.params);
    let binding = createBinding(this.binding,
      this.params, params);

    return ėval.mapEval(binding, this.body);
  }

  // this is a guess but seems about right, will
  // need testing and proof to be sure. a little
  // preplext as to why the current binding doesn't
  // need to be passed int the expansion. this may
  // be an over sight, and it maybe be correct as
  // is.
  call(binding, params, pila, ėval) {
    const expanded = this.expand(params, ėval);
    throw new MacroExpanded(expanded);
  }

  toString() {
    return "(macro " + this.args.toString() +
      this.body.toString() + ")";
  }
}

export class MacroExpanded {
  constructor(expanded) {
    this.expanded = expanded;
  }
}

