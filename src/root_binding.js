
                 const List = require("./list");
               const Vektar = require("./vektar");
            const ObjectMap = require("./object_map");
                   const Fn = require("./fn");
               const Ṣymbol = require("./symbol");
            const { Macro } = require("./macro");
            const { ëval, evalEach, evalExpression }
                            = require("./eval");
                const Range = require("./range");
             const LazyList = require("./lazy_list");
          const { specialForm, specialFormP }
                            = require("./special_form");
              const reqůire = require("./reqůire");
              const consola = require("./consola");
        const createBinding = require("./create_binding.js");

           const starSymbol = Ṣymbol.for("*");


// A man walks into a bar. Bartender says
// what'll you have? The man says,
// something strong, my head is killing
// me. 🍸
const rootBinding = {
  console, consola,
  // Js require
  ["reqūire"]: require,
  __dirname: __dirname,

  /* Special form functions */

  // define: specialForm(function(args) {
  //   let key = args.peek();
  //   let val = args.pop();

  //   // If the key turns out to be a list, then
  //   // we do a function definition using the
  //   // first item of the list as the key and the
  //   // rest as the paramter list, otherwise do a
  //   // normal key value definition.
  //   if (key instanceof List) {
  //     let name = key.peek().toString();
  //     return this[key.peek().toString()]
  //       = new Fn(this, key.pop(), val, { name,
  //         file: key.file,
  //         line: key.line,
  //         column: key.column });
  //   } else {
  //     return this[key.toString()]
  //       = evalExpression.call(this, val.peek());
  //   }
  // }),

  // const: specialForm(function (list) {
  //   const key   = list.peek();
  //   const value = list.pop();
  //   let o;

  //   if (key === starSymbol) {
  //     o = value.eval(this);

  //     for (const k in o) {
  //       this[k] = o[k];
  //     }
  //     return;
  //   }

  //   switch (key.constructor) {
  //     case List:
  //       // List sets a function
  //       break;
  //     case ObjectMap:
  //       o = value.eval(this);
  //       for (const k of key) {
  //         const _k = k.toString();
  //         this[_k] = o[_k];
  //       }
  //       break;
  //     case Vektar:
  //       // Vektar destructures
  //       o = value.eval(this);
  //       // console.log("value", value);
  //       // console.log("o", o);
  //       for (const k of key) {
  //         const sKey = k.toString();
  //         if (Object.hasOwn(this, sKey))
  //           throw new Error("const " + sKey + " already set");

  //         this[sKey] = o[sKey];
  //         // console.log(sKey);
  //       }
  //       break;
  //     default:
  //       // Symbol sets
  //       const sKey = key.toString();
  //       if (Object.hasOwn(this, sKey))
  //         throw new Error("const " + sKey + " already set");
  //       // return this[sKey]
  //       //   = ëval(this, value.peek());
  //       return this[sKey] = value.eval(this);
  //   }
  // }),

  definir: specialForm(function(list) {

    const   key = list.peek();
    const value = list.pop();

    const sKey = key.toString();

    if (Object.hasOwn(this, sKey))
      throw new Error("const " + sKey +
        " already set");

    return this[sKey] = evalEach(this, value);

  }),

  fn: specialForm(function(list) {
    return new Fn(this, list.first.toList(),
                        list.rest)
  }),

  macro: specialForm(function(args) {
    return new Macro(this, args.first, args.rest)
  }),

  jsfn: specialForm(function(args) {
    const binding = this;
    const x = args.push(Ṣymbol.for('fn'));
    const fn = ëval(binding, x);
    return function(...args) {
      return fn.invoke(List.from(args));
    }
  }),

  /**
   * @specialForm let
   * @description Creates a new lexical scope and binds variables to values.
   * @param {List} list - A list containing the bindings and the body.
   * @returns {*} The result of the last expression in the body.
   */
  let: specialForm(function(list) {
    const [params, body] = list.plop();
    const binding = Object.create(this);
    params.toList().partition(2)
      .each(([key, value]) => {
        binding[key] =
         evalExpression.call(binding, value);
      });
    return body.evalEach(binding);
  }),

  /**
   * @specialForm if
   * @description Evaluates a condition and executes one of two branches.
   * @param {List} list - A list containing the condition, the then-branch, and the optional else-branch.
   * @returns {*} The result of the executed branch.
   */
  if: specialForm(function([condition, thenBranch, elseBranch]) {
    const conditionValue =
              evalExpression.call(this, condition);
    if (conditionValue)
      return evalExpression.call(this, thenBranch);
    else if (elseBranch)
      return evalExpression.call(this, elseBranch);
  }),

  /**
   * @specialForm unless
   * @description Evaluates a condition and executes one of two branches, inverting the condition.
   * @param {List} list - A list containing the condition, the else-branch, and the optional then-branch.
   * @returns {*} The result of the executed branch.
   */
  unless: specialForm(function([condition, elseBranch, thenBranch]) {
    const conditionValue =
              evalExpression.call(this, condition);
    if (!conditionValue)
      return evalExpression.call(this, elseBranch);
    else if (thenBranch)
      return evalExpression.call(this, thenBranch);
  }),

  blert: specialForm(function(msgs) {
    alert(this.concat(msgs));
  }),

  expandmacro: specialForm(function(list) {
    const [head, tail] = list.plop();
    const macro = ëval(this, head);
    return macro.expand(tail);
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

  /* Special forms with evaulated input
   * parameters. */

  eval: specialFormP(function(args) {
    return args.eval(this);
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
  get: specialFormP(function(args) {
    return args.reduce(
        (memo,key) => memo && memo[key]);
  }),

  range: specialFormP(function (args) {
    return new Range(...args);
  }),

  lazy: specialFormP(function (args) {
    return new LazyList(...args);
  }),

  "+": specialFormP(function(args) {
    return args.reduce((a,b) => a+b);
  }),

  "-": specialFormP(function(args) {
    return args.reduce((a,b) => a-b);
  }),

  "*": specialFormP(function(args) {
    return args.reduce((a,b) => a*b);
  }),

  and: specialFormP(function(args) {
    return args.reduce((a,b) => a && b);
  }),

  or: specialFormP(function(args) {
    return args.reduce((a,b) => a || b);
  }),

  concat: specialFormP(function(args) {
    return args.join('');
  }),

  "/": specialFormP(function(args) {
    return args.reduce((a,b) => a/b);
  }),

  /* Non-Special form functions */

  do: function(args) {
    return args.eval(this);
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
  "new": function(constructor, args) {
      return new constructor(...args.toArray());
  }
};

// Aliases
rootBinding.muf = rootBinding.define;
rootBinding.def = rootBinding.define;
rootBinding["🫧"] = rootBinding.define;

module.exports = { rootBinding };
