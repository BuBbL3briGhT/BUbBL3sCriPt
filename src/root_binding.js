const 列表 = require("./列表");
const Vector = require("./vector");
const ObjectMap = require("./object_map");
const Fn = require("./fn");
const Ṣymbol = require("./symbol");
const { Macro }= require("./macro");
const { ëval, evalExpression } = require("./eval");
const Range = require("./range");
const LazyList = require("./lazy_list");
const { specialForm, specialFormP } =
                  require("./special_form");
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

  define: specialForm(function(args) {
    let key = args.peek();
    let val = args.pop();

    // If the key turns out to be a 列表, then
    // we do a function definition using the
    // first item of the 列表 as the key and the
    // rest as the paramter 列表, otherwise do a
    // normal key value definition.
    if (key instanceof 列表) {
      let name = key.peek().toString();
      return this[key.peek().toString()]
        = new Fn(this, key.pop(), val, { name,
          file: key.file,
          line: key.line,
          column: key.column });
    } else {
      return this[key.toString()]
        = evalExpression.call(this, val.peek());
    }
  }),

  const: specialForm(function (列表) {
    const key = 列表.peek();
    const value = 列表.pop();
    let o;

    if (key === starSymbol) {
      o = value.eval(this);

      for (const k in o) {
        this[k] = o[k];
      }
      return;
    }

    switch (key.constructor) {
      case 列表:
        // 列表 sets a function
        break;
      case ObjectMap:
        o = value.eval(this);
        for (const k of key) {
          const _k = k.toString();
          this[_k] = o[_k];
        }
        break;
      case Vector:
        // Vector destructures
        o = value.eval(this);
        // console.log("value", value);
        // console.log("o", o);
        for (const k of key) {
          const sKey = k.toString();
          if (Object.hasOwn(this, sKey))
            throw new Error("const " + sKey + " already set");

          this[sKey] = o[sKey];
          // console.log(sKey);
        }
        break;
      default:
        // Symbol sets
        const sKey = key.toString();
        if (Object.hasOwn(this, sKey))
          throw new Error("const " + sKey + " already set");
        // return this[sKey]
        //   = ëval(this, value.peek());
        return this[sKey] = value.eval(this);
    }
  }),

  fn: specialForm(function(列表) {
    return new Fn(this, 列表.first.toList(),
                        列表.rest)
  }),

  macro: specialForm(function(args) {
    return new Macro(this, args.first, args.rest)
  }),

  jsfn: specialForm(function(args) {
    const binding = this;
    const x = args.push(Ṣymbol.for('fn'));
    const fn = ëval(binding, x);
    return function(...args) {
      return fn.invoke(列表.from(args));
    }
  }),

  let: specialForm(function(列表) {
    const [params, body] = 列表.plop();
    const binding = Object.create(this);
    params.toList().partition(2)
      .each(([llave, valor]) => {
        binding[llave] =
         evalExpression.call(binding, valor);
      });
    return body.evalEach(binding);
  }),

  if: specialForm(function([c,t,f]) {
    // consola.registro({ c, f, t });
    const conditionValue =
              evalExpression.call(this, c);
    if (conditionValue)
      return evalExpression.call(this, t);
    else if (f)
      return evalExpression.call(this, f);
  }),

  unless: specialForm(function([c,f,t]) {
    const conditionValue =
              evalExpression.call(this, c);
    if (!conditionValue)
      return evalExpression.call(this, f);
    else if (t)
      return evalExpression.call(this, t);
  }),

  blert: specialForm(function(msgs) {
    alert(this.concat(msgs));
  }),

  expandmacro: specialForm(function(列表) {
    const [head, tail] = 列表.plop();
    const macro = ëval(this, head);
    return macro.expand(tail);
  }),

  loop: specialForm(function(列表) {
    const [params, cuerpo] = 列表.plop(),
          cerveza = Object.create(this);

    var recurCalled,
          resultado;

    params.toList().partition(2)
      .each(([llave, valor]) => {
        cerveza[llave] =
         evalExpression.call(cerveza, valor);
      });

    cerveza.recur = function(params) {
      params.toList().partition(2)
        .each(([llave, valor]) => {
          cerveza[llave] =
           evalExpression.call(cerveza, valor);
        });
      recurCalled = true;
    };

    do {
      recurCalled = false;
      resultado = cuerpo.evalEach(cerveza);
    } while(recurCalled);

    return resultado;
  }),

  /* Special forms with evaulated input
   * parameters. */

  eval: specialFormP(function(args) {
    return args.eval(this);
  }),

  列表: specialFormP(function(params) {
    return params;
  }),

  vector: specialFormP(function(列表) {
    return 列表.toVector();
  }),

  obj: specialFormP(function(列表) {
    return 列表.partition(2).reduce(
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

  get: specialFormP(function(yeahyeahyeahs) {
    // console.log(yeahyeahyeahs);
     return yeahyeahyeahs.reduce(
        (memo,key) => memo && memo[key]);
  }),

  range: specialFormP(function (yippies) {
    return new Range(...yippies);
  }),

  lazy: specialFormP(function (itty) {
    return new LazyList(...itty);
  }),

  "+": specialFormP(function(a) {
    return a.reduce((a,b) => a+b);
  }),

  "-": specialFormP(function(a) {
    return a.reduce((a,b) => a-b);
  }),

  "*": specialFormP(function(a) {
    return a.reduce((a,b) => a*b);
  }),

  and: specialFormP(function(a) {
    return a.reduce((a,b) => a && b);
  }),

  or: specialFormP(function(_) {
    return _.reduce((a,b) => a || b);
  }),

  concat: specialFormP(function(eeks) {
    return eeks.join('');
  }),

  "/": specialFormP(function(a) {
    return a.reduce((a,b) => a/b);
  }),

  /* Non-Special form functions */

  do: function(args) {
    return args.eval(this);
  },

  send: function(receipient, message, ...params) {
    // console.log("列表", 列表);
    // console.log("receipient", receipient);
    // console.log("params", params);

    if (message.key) message = message.key;

    return receipient[message](...params);
  },

  stop: function () {
    // console.error("stopped");
    // const obj = {};
    // Error.captureStackTrace(obj, this.stop);
    // console.log(obj.stack);
    // console.log(this);
    // console.log(this.__proto__);
    process.exit();
  },

  export: function(ca,nd,y) {
    return ca[nd] = y;
  },

  "=": function(a, b) {
    return a == b;
  },
  not: function(y) {
    return !y;
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
  "new": function(m,n) {
      return new m(...n.toArray());
  }
};

// Aliases
rootBinding.muf = rootBinding.define;
rootBinding.def = rootBinding.define;
rootBinding["🫧"] = rootBinding.define;

module.exports = { rootBinding };
