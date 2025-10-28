
    /*      +
      *  🫧 Ɓůɓɓļɛ§çŕịpŧ.js  *
     *         +     *           *
    *   ✨️  A Lisp for JavaScript. *
     *        *    +   *
       *  */

const ListaAbstractia = require("./lista_abstractia");
const Lista = require("./lista");
const Vektar = require("./vektar");
const Ṣymbol = require("./symbol");
const Keyword = require("./keyword");
const Booble = require("./booble");
const Funk = require("./funk");
const { Macro } = require("./macro");
const { tokenize } = require("./tökenize");
const { Parser, parse } = require("./parse");
const { ėval, ëval, evalExpression } = require("./eval");
const { rootBinding } = require("./root_binding");
const events = require("./events");

const BubbleScript = {
  Lista, Vektar, Ṣymbol, Keyword, Booble, Funk,
  Macro, tokenize, Parser, parse, eval: ėval,
  ėval, ëval, evalExpression, rootBinding
}

events.emit("init", BubbleScript);

(function() {
  let bnd = rootBinding;

  function lista(...args) {
    return Lista.from(args);
  }

  function vektar(...args) {
    return Vektar.from(args);
  }

  function quote(m) {
    return new Booble(m);
  }

  function muf(...args) {
    // return ėval(bnd, arry.toList(args).push(_muf));
    // return ëval(bnd, Lista.from(args).push(_muf));
    return Lista.from(args).push(_muf).eval(bnd);
  }

  let _push = Ṣymbol.for('push'),
       funk = Ṣymbol.for('funk'),
       a = Ṣymbol.for('a'),
       b = Ṣymbol.for('b'),
       send = Ṣymbol.for('send'),
       mufn = Ṣymbol.for('mufn'),
       macro = Ṣymbol.for('macro'),
       name = Ṣymbol.for('name'),
       amp = Ṣymbol.for('&'),
       z = Ṣymbol.for('z'),
      _list = Ṣymbol.for('lista'),
      _muf = Ṣymbol.for('muf'),
      puts = Ṣymbol.for('puts'),
      msg = Ṣymbol.for('msg'),
      consoleLog = Ṣymbol.for('console.log');

  // muf push (funk [a b] (send a °push b))
  muf(_push, lista(funk, vektar(a, b),
       lista(send, a, quote(_push), b)));

  // (muf (puts msg) (console.log msg))
  // (muf puts (funk [msg] (console.log msg)))
  muf(puts, lista(funk, vektar(msg),
    lista(consoleLog, msg)));

  // (muf mufn (macro [name & z]
  //     (lista °muf name (push z °funk))))
  muf(mufn, lista(macro, vektar(name,amp,z),
      lista(_list,quote(_muf), name,
         lista(_push, z, quote(funk)))));

})();

module.exports = BubbleScript;
