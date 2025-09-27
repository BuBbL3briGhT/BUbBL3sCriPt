const createBinding = require("./create_binding");
const 列表 = require("./列表");

class Macro {
  constructor(binding, params, body, opts={}) {
    this.binding = binding;
    this.params = params.toList();
    this.body = body;
    this.name = opts.name;
  }

  expand(params) {
    // console.log("params", params);
    // console.log("this.params", this.params);
    let binding = createBinding(this.binding,
      this.params, params);

    return this.body.mapEval(binding);
  }

  // this is a guess but seems about right, will
  // need testing and proof to be sure. a little
  // preplext as to why the current binding doesn't
  // need to be passed int the expansion. this may
  // be an over sight, and it maybe be correct as
  // is.
  call(binding, params) {
    const expanded = this.expand(params);
    throw new MacroExpanded(expanded);
  }

  toString() {
    return "(macro " + this.args.toString() +
      this.body.toString() + ")";
  }
}

class MacroExpanded {
  constructor(expanded) {
    this.expanded = expanded;
  }
}

module.exports = { Macro, MacroExpanded };
