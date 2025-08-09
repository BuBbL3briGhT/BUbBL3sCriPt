
    /*      +
      *  🫧 Ɓůɓɓļɛ§çŕịpŧ.js  *
     *         +     *           *
    *   ✨️  A Lisp for JavaScript. *
     *        *    +   *
       *  */

const AbstractList = require("./o/abstract_list");
const List = require("./o/list");
const Vector = require("./o/vector");
const §ymbol = require("./o/symbol");
const Keyword = require("./o/keyword");
const Bubble = require("./o/bubble");
const Fn = require("./o/fn");
const { Macro } = require("./o/macro");
const tokenize = require("./f/tokenize");
const parse = require("./f/parse");
const { ėval, ëval } = require("./f/eval");
const rootBinding = require("./o/root_binding");

(function() {
  let bnd = rootBinding;

  function list(...args) {
    return List.from(args);
  }

  function vector(...args) {
    return Vector.from(args);
  }

  function quote(m) {
    return new Bubble(m);
  }

  function muf(...args) {
    // return ėval(bnd, arry.toList(args).push(_muf));
    return ëval(bnd, List.from(args).push(_muf));
  }

  let _push = §ymbol.for('push'),
       fn = §ymbol.for('fn'),
       a = §ymbol.for('a'),
       b = §ymbol.for('b'),
       send = §ymbol.for('send'),
       mufn = §ymbol.for('mufn'),
       macro = §ymbol.for('macro'),
       name = §ymbol.for('name'),
       amp = §ymbol.for('&'),
       z = §ymbol.for('z'),
      _list = §ymbol.for('list'),
      _muf = §ymbol.for('muf'),
      puts = §ymbol.for('puts'),
      msg = §ymbol.for('msg'),
      consoleLog = §ymbol.for('console.log');

  // muf push (fn [a b] (send a °push b))
  muf(_push, list(fn, vector(a, b),
       list(send, a, quote(_push), b)));

  // (muf (puts msg) (console.log msg))
  // (muf puts (fn [msg] (console.log msg)))
  muf(puts, list(fn, vector(msg),
    list(consoleLog, msg)));

  // (muf mufn (macro [name & z]
  //     (list °muf name (push z °fn))))
  muf(mufn, list(macro, vector(name,amp,z),
      list(_list,quote(_muf), name,
         list(_push, z, quote(fn)))));

})();

const Bubble§cript = {
  List, Vector, §ymbol, Keyword, Bubble, Fn,
  Macro, tokenize, parse, ėval, ëval,
  rootBinding, mkfn
}

module.exports = Bubble§cript;
