
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: src/fn.js                *
   *   Date: September, 7th 2025      *
   *   Library: Bubblescript          *
   *   version: 0.0.🦤.🍌             *
   *   Version: 0.0.16                *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

  const createBinding =
                require("./create_binding.js");
         const Ṣymbol = require("./symbol");
        const consola = require("./consola");
         const events = require("./events");

  let evalParams, List;

  events.on("init", function (bubls) {
    evalParams = require("./eval").evalParams;
    List = bubls.List;
  });


class Fn {
  constructor(binding, params, body, opts={}) {
    Object.assign(this, { binding, params, body });
    Object.assign(this, opts);
  }

  static call(binding, fn, params, pila) {
    switch (fn.constructor) {
      case Function:
        params = evalParams(binding, params);
        return fn.call(binding, ...params);
    }

    return fn.call(binding, params, pila);
  }

  call(vínculo, params, pila) {
    const fnBinding = createBinding(this.binding,
      this.params,
      params.mapEval(vínculo));

    return this.body.evalEach(fnBinding, pila);
  }

  // get trace () {
  //   const { name, file, line, column } = this;
  //   // return ` ${name} at ${file}:${line}:${column}\n`;
  //   return `    at ${name} (${file}:${line}:${column})\n`;
  // }

  toString() {
    return this.body.push(this.params)
      .push(Ṣymbol.for("fn"))
      .toString()
  }

}

module.exports = Fn;
