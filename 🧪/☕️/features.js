/* # Language Features
 * Description: This file contains tests and
 * descriptions of key language feature. */

// import { description, it as example } from "mocha";
const example = it;
import assert from 'assert';
import { ėval } from '../../☕️/eval.js';

describe('Objects', function () {
  describe('Property Access', function () {
    example('Using dot notation in symbol', function () {
      const context = { a: { b: { c: 'Yatze!' } } };
      assert.equal(ėval(context, 'a.b.c'), 'Yatze!');
    });
  });
});
