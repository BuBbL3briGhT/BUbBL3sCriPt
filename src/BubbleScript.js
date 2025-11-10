
    /*      +
      *  🫧 Ɓůɓɓļɛ§çŕịpŧ.js  *
     *         +     *           *
    *   ✨️  It's Łïṣ̌p for J̣̌ąvåŞćṛịpŧ. *
     *        *    +   *
       *  */

                        const AbstractList = require("./abstract_list");
                                const List = require("./list");
                              const Vektar = require("./vektar");
                              const Ṣymbol = require("./symbol");
                             const Keyword = require("./keyword");
                              const Bubble = require("./bubble");
                                  const Fn = require("./fn");
                           const { Macro } = require("./macro");
                        const { tokenize } = require("./tökenize");
                   const { Parser, parse } = require("./parse");
  const { ėval, evalEach, evalExpression } = require("./eval");
                     const { rootBinding } = require("./root_binding");
                              const events = require("./events");


const BubbleScript = {
  List, Vektar, Ṣymbol, Keyword, Bubble, Fn, Macro,
  tokenize, Parser, parse, ėval, evalEach,
  evalExpression, rootBinding
}

BubbleScript.eval = ėval.bind(null, rootBinding);

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
    return evalEach(bnd, List.from(args).push(_muf));
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
  muf(_push, list(fn, vektar(a, b),
       list(send, a, quote(_push), b)));

  // (muf (puts msg) (console.log msg))
  // (muf puts (fn [msg] (console.log msg)))
  muf(puts, list(fn, vektar(msg),
    list(consoleLog, msg)));

  // (muf mufn (macro [name & z]
  //     (list °muf name (push z °fn))))
  muf(mufn, list(macro, vektar(name,amp,z),
      list(_list,quote(_muf), name,
         list(_push, z, quote(fn)))));

})();

module.exports = BubbleScript;
