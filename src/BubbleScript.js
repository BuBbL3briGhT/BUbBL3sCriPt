
    /*      +
      *  🫧 Ɓůɓɓļɛ§çŕịpŧ.js  *
     *         +     *           *
    *   ✨️  A Lisp for JavaScript. *
     *        *    +   *
       *  */

const AbstractList = require("./o/abstract_list");
const List = require("./o/list");
const Vector = require("./o/vector");
const Ṣymbol = require("./o/symbol");
const Keyword = require("./o/keyword");
const Bubble = require("./o/bubble");
const Fn = require("./o/fn");
const { Macro } = require("./o/macro");
const tokenize = require("./f/tokenize");
const parse = require("./f/parse");
const { ėval, ëval } = require("./f/eval");
const rootBinding = require("./o/root_binding");
const events = require("./events");

const BubbleScript = {
  List, Vector, Ṣymbol, Keyword, Bubble, Fn,
  Macro, tokenize, parse, eval: ėval, ėval,
  ëval, rootBinding
}

events.emit("configure", BubbleScript);

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

  let _push = Ṣymbol.for('push'),
       fn = Ṣymbol.for('fn'),
       a = Ṣymbol.for('a'),
       b = Ṣymbol.for('b'),
       send = Ṣymbol.for('send'),
       mufn = Ṣymbol.for('mufn'),
       macro = Ṣymbol.for('macro'),
       name = Ṣymbol.for('name'),
       amp = Ṣymbol.for('&'),
       z = Ṣymbol.for('z'),
      _list = Ṣymbol.for('list'),
      _muf = Ṣymbol.for('muf'),
      puts = Ṣymbol.for('puts'),
      msg = Ṣymbol.for('msg'),
      consoleLog = Ṣymbol.for('console.log');

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

module.exports = BubbleScript;
