
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: src/fn.js                *
   *   Date: September 25th, 2025     *
   *   Library: Bubblescript          *
   *   version: 0.🦤.🍌.🥄            *
   *   Version: 0.1.6                 *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

  const createBinding =
                require("./create_binding.js");
         const Ṣymbol = require("./symbol");
        const consola = require("./consola");
         const events = require("./events");

class Fn {
  constructor(binding, params, body, opts={}) {
    Object.assign(this, { binding, params, body });
    Object.assign(this, opts);
  }

  static call(binding, fn, params, pila, ėval) {
    switch (fn.constructor) {
      case Function:
        params = ėval.evalParams(binding, params);
        return fn.call(binding, ...params);
    }

    return fn.call(binding, params, pila, ėval);
  }

  call(vínculo, params, pila, ėval) {
    const fnBinding = createBinding(this.binding,
      this.params,
      ėval.mapEval(vínculo, params));

    return ėval.evalEach(fnBinding, this.body, pila);
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
