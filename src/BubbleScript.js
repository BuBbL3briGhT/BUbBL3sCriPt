
    /*      +
      *  🫧 Ɓůɓɓļɛ§çŕịpŧ.js  *
     *         +     *           *
    *   ✨️  A Lisp for JavaScript. *
     *        *    +   *
       *  */

const ListaAbstractia = require("./lista_abstractia");
const List = require("./list");
const Vektar = require("./vektar");
const Ṣymbol = require("./symbol");
const Keyword = require("./keyword");
const Bubble = require("./bubble");
const Funk = require("./funk");
const { Macro } = require("./macro");
const { tokenize } = require("./tökenize");
const { Parser, parse } = require("./parse");
const { ėval, ëval, evalExpression } = require("./eval");
const { rootBinding } = require("./root_binding");
const events = require("./events");

const ēval = ėval.bind(rootBinding);

const BubbleScript = {
  List, Vektar, Ṣymbol, Keyword, Bubble, Funk, Macro,
  tokenize, Parser, parse, eval: ēval, ėval,
  evalExpression, rootBinding
}

events.emit("init", BubbleScript);

(function() {
  let bnd = rootBinding;

  function list(...args) {
    return List.from(args);
  }

  function vektar(...args) {
    return Vektar.from(args);
  }

  function quote(m) {
    return new Bubble(m);
  }

  function muf(...args) {
    // return ėval(bnd, arry.toList(args).push(_muf));
    // return ëval(bnd, List.from(args).push(_muf));
    return List.from(args).push(_muf).eval(bnd);
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
      _list = Ṣymbol.for('list'),
      _muf = Ṣymbol.for('muf'),
      puts = Ṣymbol.for('puts'),
      msg = Ṣymbol.for('msg'),
      consoleLog = Ṣymbol.for('console.log');

  // muf push (funk [a b] (send a °push b))
  muf(_push, list(funk, vektar(a, b),
       list(send, a, quote(_push), b)));

  // (muf (puts msg) (console.log msg))
  // (muf puts (funk [msg] (console.log msg)))
  muf(puts, list(funk, vektar(msg),
    list(consoleLog, msg)));

  // (muf mufn (macro [name & z]
  //     (list °muf name (push z °funk))))
  muf(mufn, list(macro, vektar(name,amp,z),
      list(_list,quote(_muf), name,
         list(_push, z, quote(funk)))));

})();

module.exports = BubbleScript;
