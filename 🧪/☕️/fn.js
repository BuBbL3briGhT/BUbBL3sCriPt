import assert from 'node:assert';
import { it, describe } from 'mocha';
import Fn from '../../☕️/fn.js';
import { List } from '../../☕️/list.js';
import Ṣymbol from '../../☕️/symbol.js';

describe('Fn', function () {
  describe('toString', function () {
    it('returns function as a string', function () {
      const a = Ṣymbol.for('a');
      const b = Ṣymbol.for('b');
      const fn = new Fn({}, List.make(a, b), List.make(a));
      assert.equal(fn.toString(), '((fn a b) a)');
    });
  });
});
