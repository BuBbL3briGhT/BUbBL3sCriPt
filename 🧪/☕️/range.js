import assert from 'node:assert';
import { it, describe } from 'mocha';
import Range from '../../☕️/range.js';

describe('Range', function () {
  it('creates a range of 10', function () {
    const range = new Range(10);
    assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [...range]);
  });

  it('creates a range of 10 by 2', function () {
    const range = new Range(0, 10, 2);
    assert.deepEqual([0, 2, 4, 6, 8], [...range]);
  });
});
