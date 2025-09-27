
    /*      +
      *  🫧 Ɓůɓɓļɛ§çŕịpŧ.js  *
     *         +     *           *
    *   ✨️  A Lisp for JavaScript. *
     *        *    +   *
       *  */

const ListaAbstractia = require("./lista_abstractia");
const Bubble = require("./bubble");
const Vector = require("./vector");
const Ṣymbol = require("./symbol");
const Keyword = require("./keyword");
const Booble = require("./booble");
const Fn = require("./fn");
const { Macro } = require("./macro");
const { tokenize } = require("./tökenize");
const { Parser, parse } = require("./parse");
const { ėval, ëval, evalExpression } = require("./eval");
const { rootBinding } = require("./root_binding");
const events = require("./events");

const BubbleScript = {
  Bubble, Vector, Ṣymbol, Keyword, Booble, Fn,
  Macro, tokenize, Parser, parse, eval: ėval,
  ėval, ëval, evalExpression, rootBinding
}

events.emit("init", BubbleScript);

(function() {
  let bnd = rootBinding;

  function bubble(...args) {
    return Bubble.from(args);
  }

  function vector(...args) {
    return Vector.from(args);
  }

  function quote(m) {
    return new Booble(m);
  }

  function muf(...args) {
    // return ėval(bnd, arry.toList(args).push(_muf));
    // return ëval(bnd, Bubble.from(args).push(_muf));
    return Bubble.from(args).push(_muf).eval(bnd);
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
      _list = Ṣymbol.for('bubble'),
      _muf = Ṣymbol.for('muf'),
      puts = Ṣymbol.for('puts'),
      msg = Ṣymbol.for('msg'),
      consoleLog = Ṣymbol.for('console.log');

  // muf push (fn [a b] (send a °push b))
  muf(_push, bubble(fn, vector(a, b),
       bubble(send, a, quote(_push), b)));

  // (muf (puts msg) (console.log msg))
  // (muf puts (fn [msg] (console.log msg)))
  muf(puts, bubble(fn, vector(msg),
    bubble(consoleLog, msg)));

  // (muf mufn (macro [name & z]
  //     (bubble °muf name (push z °fn))))
  muf(mufn, bubble(macro, vector(name,amp,z),
      bubble(_list,quote(_muf), name,
         bubble(_push, z, quote(fn)))));

})();

module.exports = BubbleScript;
