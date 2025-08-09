const createBinding = require("../f/create_binding.js");

class Macro {
  constructor(binding, params, body, opts={}) {
    this.binding = binding;
    this.params = params.toList();
    this.body = body;
    this.name = opts.name;
  }

  expand(params) {
    let binding = createBinding(this.binding,
      this.params, params);

    return this.body.mapEval(binding);
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
