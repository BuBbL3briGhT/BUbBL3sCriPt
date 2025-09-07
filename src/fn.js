const createBinding = require("./create_binding.js");
const Ṣymbol = require("./symbol");
const consola = require("./consola");

class Fn {
  constructor(binding, params, body, opts={}) {
    Object.assign(this, { binding, params, body,
      name: opts.name });
  }

  static call(binding, fn, params) {
    switch (fn.constructor) {
      case Function:
        const { evalParams } = require("./eval");
        params = evalParams(binding, params);
        return fn.call(binding, ...params);
    }

    return fn.call(binding, params);
  }

  call(binding, params) {
    try {
      const fnBinding = createBinding(this.binding,
        this.params,
        params.mapEval(binding));

      return this.body.evalEach(fnBinding);
    } catch (error) {
      error.stack += this.trace;
      throw error;
    }
  }

  get trace () {
    const { name, file, line, column } = this;
    return ` ${name} at ${file}:${line}:${column}`;
  }

  toString() {
    return this.body.push(this.params)
      .push(Ṣymbol.for("fn"))
      .toString()
  }

}

module.exports = Fn;
