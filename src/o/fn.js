const createBinding = require("../f/create_binding.js");

class Fn {

  constructor(binding, params, body, opts={}) {
    this.binding = binding;
    this.params = params;
    this.body = body;
    this.name = opts.name;
  }

  invoke(params) {
    let binding = createBinding(this.binding,
      this.params, params);

    return this.body.eval(binding);
  }

  toString() {
    return this.body.push(this.params)
      .push(Ṣymbol.for("fn"))
      .toString()
  }

}

module.exports = Fn;
