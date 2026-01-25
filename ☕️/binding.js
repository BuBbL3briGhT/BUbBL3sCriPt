
  /* * *  * * *  * *  * *  * * *  * * *  * *  * *
   *                                            *
   *        File: src/binding.js                *
   *        Date: December 2025                 *
   *        Library: Bubblescript               *
   *        version:                            *
   *        Version:                            *
   *        Author(s): BaMbii                   *
   *                                            *
   * * *  * * *  * *  * *  * * *  * * *  * *  * */

import { List, Vektar, ObjectMap, LazyList }
                              from "./list.js";
import Fn from "./fn.js";
import Ṣymbol from "./symbol.js";
import { Macro } from "./macro.js";
import { ėval, evalEach, evalExpression }
                              from "./eval.js";
import Range from "./range.js";
import { specialForm, specialFormP }
                      from "./special_form.js";

import { parse } from "./parse.js";
import path from "path";
import fs from "fs";
import { createRequire } from "module";


const starSymbol = Ṣymbol.for("*");
const sAmp = Ṣymbol.for("&");

function ensureKeyNotDefined(binding, key) {
  if (Object.hasOwn(binding, key))
    throw new Error("const " + key +
      " already set");
}

const { getModule, storeModule } =
  (function () {
    const modules = Object.create(null);

    function getModule(key) {
      return modules[key];
    }

    function storeModule(key, module={}) {
      module[key] = module;
    }

    return { getModule, storeModule };
  })();

export const rootBinding = {
  console, // consola,
  process, List, Array,
  // Js require
  ["☕️"]: createRequire(import.meta.url),
  __dirname: import.meta.dirname,

  /* Special form functions */

  [':']: specialForm(function(list) {

    const [key, value] = list.plop();

    // If the key turns out to be a list, then
    // we do a function definition using the
    // first item of the list as the key and the
    // rest as the paramter list, otherwise do a
    // normal key value definition.
    if (key instanceof List) {
      const sKey = key.peek().toString();
      ensureKeyNotDefined(this, sKey);
      return this[sKey]
        = new Fn(this, key.pop(), value, {
          name: sKey,
          file: key.file,
          line: key.line,
          column: key.column });
    } else if (key instanceof ObjectMap) {
      const o = evalEach(this, value);
      for (const k of key) {
        const _k = k.toString();

        this[_k] = o[_k];
      }
      return true;
    } else {
      const sKey = key.toString();
      ensureKeyNotDefined(this, sKey);
      return this[sKey] = evalEach(this, value);
    }

  }),

  fn: specialForm(function(params) {
    return specialForm(function(body) {
      return new Fn(this, params, body);
    })
  }),

  jsfn: specialForm(function(params) {
    return specialForm(function(body) {
      const fn = new Fn(this, params, body);
      return function(...params) {
        // console.log({params});
        return fn.call(this,
          List.from(params), [], ėval);
      }
    })
  }),

  macro: specialForm(function(params) {
    return specialForm(function (body) {
      return new Macro(this, params, body);
    });
  }),

  ["define-macro"]: specialForm(function(list) {
    const [signature, body] = list.tuple;
    const [name, params] = signature.tuple;
    return this[name.toString()] =
        new Macro(this, params, body);
  }),

  /**
   * @specialForm let
   * @description Creates a new lexical scope and binds variables to values.
   * @param {List} list - A list containing the bindings and the body.
   * @returns {*} The result of the last expression in the body.
   */
  let: specialForm(function(list) {
    const [params, body] = list.plop();
    const binding = createBinding(this);
    params.toList().partition(2)
      .each(([key, value]) => {
        binding[key] =
         evalExpression(binding, value);
      });
    return evalEach(binding, body);
  }),

  /**
   * @specialForm if
   * @description Evaluates a condition and executes one of two branches.
   * @param {List} list - A list containing the condition, the then-branch, and the optional else-branch.
   * @returns {*} The result of the executed branch.
   */
  if: specialForm(function([condition, thenBranch, elseBranch]) {
    const conditionValue =
              evalExpression(this, condition);
    if (conditionValue)
      return evalExpression(this, thenBranch);
    else if (elseBranch)
      return evalExpression(this, elseBranch);
  }),

  /**
   * @specialForm unless
   * @description Evaluates a condition and executes one of two branches, inverting the condition.
   * @param {List} list - A list containing the condition, the else-branch, and the optional then-branch.
   * @returns {*} The result of the executed branch.
   */
  unless: specialForm(function([condition, elseBranch, thenBranch]) {
    const conditionValue =
              evalExpression(this, condition);
    if (!conditionValue)
      return evalExpression(this, elseBranch);
    else if (thenBranch)
      return evalExpression(this, thenBranch);
  }),

  blert: specialForm(function(msgs) {
    alert(this.concat(msgs));
  }),

  ["expand-macro"]: specialForm(function(list) {
    const [name, params] = list.tuple;
    // console.log({ name, params });
    const macro = evalExpression(this, name);
    return macro.expand(params, ėval);
    // console.log(macro);
    // console.log(macro.expand(params));
    // return List.make();
  }),

  /**
   * @specialForm loop
   * @description Creates a loop with a set of bindings that can be updated with `recur`.
   * @param {List} list - A list containing the initial bindings and the loop body.
   * @returns {*} The result of the last expression in the loop body.
   */
  loop: specialForm(function(list) {
    const [params, body] = list.plop(),
          scope = Object.create(this);

    var recurCalled,
          result;

    params.toList().partition(2)
      .each(([key, value]) => {
        scope[key] =
         evalExpression.call(scope, value);
      });

    scope.recur = function(params) {
      params.toList().partition(2)
        .each(([key, value]) => {
          scope[key] =
           evalExpression.call(scope, value);
        });
      recurCalled = true;
    };

    do {
      recurCalled = false;
      result = body.evalEach(scope);
    } while(recurCalled);

    return result;
  }),

  do: specialForm(function(list) {
    return evalEach(this, list);
  }),

  /* Special forms with evaulated input
   * parameters. */

  eval: specialFormP(function(params) {
    return params.eval(this);
  }),

  list: specialFormP(function(params) {
    return params;
  }),

  vektar: specialFormP(function(list) {
    return list.toVector();
  }),

  obj: specialFormP(function(list) {
    return list.partition(2).reduce(
      function(memo, [key, val]) {
        memo[key] = val;
        return memo;
      }, {});
  }),

  print: specialFormP(function(vals) {
    return vals.each(function(value) {
      document.body.append(value);
    });
  }),

  /**
   * @specialForm get
   * @description Accesses a value in a nested object or array.
   * @param {List} list - A list containing the object and the keys to access.
   * @returns {*} The value at the specified path, or undefined if not found.
   */
  get: specialFormP(function(params) {
    return params.reduce(
        (memo,key) => memo && memo[key]);
  }),

  range: specialFormP(function (params) {
    return new Range(...params);
  }),

  lazy: specialFormP(function (params) {
    return new LazyList(...params);
  }),

  "+": specialFormP(function(params) {
    return params.reduce((a,b) => a+b);
  }),

  "-": specialFormP(function(params) {
    return params.reduce((a,b) => a-b);
  }),

  "*": specialFormP(function(params) {
    return params.reduce((a,b) => a*b);
  }),

  and: specialFormP(function(params) {
    return params.reduce((a,b) => a && b);
  }),

  or: specialFormP(function(params) {
    return params.reduce((a,b) => a || b);
  }),

  concat: specialFormP(function(params) {
    return params.join('');
  }),

  "/": specialFormP(function(params) {
    return params.reduce((a,b) => a/b);
  }),


  /* Non-Special form functions */

  require: function(name) {

    const modulePath =
     (name[0] == ".") ?
       // path.resolve(import.meta.dirname, name + ".🫧") :
       path.resolve(import.meta.dirname, name) :
       path.resolve(import.meta.dirname, "../🫧",
         name + ".🫧");

    const module = getModule(modulePath);
    if (module) return module.exports;


    let moduleExports;
    const binding = createBinding(this);

    binding.__dirname = path.dirname(modulePath);

    binding.module = {
      exports: function(exports) {
        moduleExports = exports.createObject(binding);
      }
    }

    const parseTree =
      parse(fs.readFileSync(modulePath, 'utf-8'));
    try {
      evalEach(binding, parseTree);
    } catch (error) {
      console.log("Error evaluating " + modulePath);
      throw error;
    }

    storeModule(modulePath,
         { exports: moduleExports });

    return moduleExports;
  },

  /**
   * @function send
   * @description Invokes a method on an object.
   * @param {Object} recipient - The object to invoke the method on.
   * @param {string|Symbol} message - The name of the method to invoke.
   * @param {...*} params - The arguments to pass to the method.
   * @returns {*} The result of the method invocation.
   */
  send: function(recipient, message, ...params) {
    if (message.key) message = message.key;

    // console.log({recipient, message, params});
    return recipient[message](...params);
  },

  /**
   * @function stop
   * @description Exits the process.
   */
  stop: function () {
    process.exit();
  },

  /**
   * @function export
   * @description Exports a value to an object.
   * @param {Object} target - The object to export to.
   * @param {string|Symbol} name - The name of the export.
   * @param {*} value - The value to export.
   * @returns {*} The exported value.
   */
  export: function(target, name, value) {
    return target[name] = value;
  },

  "=": function(a, b) {
    return a == b;
  },
  not: function(value) {
    return !value;
  },
  '>': (a,b) => {
    return a > b;
  },
  '<': (a,b) => {
    return a < b;
  },
  parse: function(s) {
    return parse(s);
  },
  new: function(constructor, ...params) {
      return new constructor(...params);
  }
};

 // Aliases
(function () {

            this["✨️"] = this.new;
              this.muf = this[':'];
           this.define = this[':'];
              this.def = this[':'];
            this.const = this[':'];
            this["🫧"] = this[':'];
          this["定義"] = this[':'];
              this.req = this.require;
          this["要求"] = this.require;
    this["require-☕️"] = this["☕️"];

}).call(rootBinding);

// Española
(function (o) {
  o.requerir = o.require;
   o.definir = o.define;
})(rootBinding);

// Object.freeze(rootBinding);

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
export function createBinding(proto=rootBinding, keys, values) {
  const binding = Object.create(proto);
  if (keys) applyArguments(binding, keys, values);
  return binding;
}

