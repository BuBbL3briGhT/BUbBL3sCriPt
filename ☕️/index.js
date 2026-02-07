/*      +
 *  🫧 Ɓůɓɓļɛ§çŕịpŧ.js  *
 *         +     *           *
 *   ✨️  It's Łïṣ̌p for J̣̌ąvåŞćṛịpŧ. *
 *        *    +   *
 *  */

import { AbstractList, List, Vektar } from './list.js';
import Ṣymbol from './symbol.js';
import Keyword from './keyword.js';
import Bubble from './bubble.js';
import Fn from './fn.js';
import { Macro } from './macro.js';
import { tokenize } from './tokenize.js';
import { Parser, parse } from './parse.js';
import { ėval, evalEach, evalExpression } from './eval.js';
import { rootBinding } from './binding.js';
import load from './load.js';

const BubbleScript = {
  List,
  Vektar,
  Ṣymbol,
  Keyword,
  Bubble,
  Fn,
  Macro,
  tokenize,
  Parser,
  parse,
  ėval,
  evalEach,
  evalExpression,
  rootBinding,
  load,
};

BubbleScript.eval = ėval.bind(null, rootBinding);

(function () {
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
  muf(_push, list(fn, vektar(a, b), list(send, a, quote(_push), b)));

  // (muf (puts msg) (console.log msg))
  // (muf puts (fn [msg] (console.log msg)))
  muf(puts, list(fn, vektar(msg), list(consoleLog, msg)));

  // (muf mufn (macro [name & z]
  //     (list °muf name (push z °fn))))
  muf(
    mufn,
    list(
      macro,
      vektar(name, amp, z),
      list(_list, quote(_muf), name, list(_push, z, quote(fn))),
    ),
  );
})();

export default BubbleScript;

import fs from 'fs';
import path from 'path';

// BubbleScript.load = function (filePath) {
//   filePath = path.join(import.meta.dirname, filePath);
//   return BubbleScript.eval(fs.readFileSync(filePath, 'utf-8'))
// }

// BubbleScript.load("../lib/core.🫧");

// function configure(config) {
//   const _require = config.require
//   const _dirname = config.dirname;
//   const { rootBinding } = BubbleScript;

//   if (_require)
//     rootBinding.require = _require;

//   if (_dirname)
//     BubbleScript.load = function (filePath) {
//       filePath = path.join(_dirname, filePath);
//       return BubbleScript.eval(fs.readFileSync(filePath, 'utf-8'))
//     }
// }

// BubbleScript.configure = configure;
