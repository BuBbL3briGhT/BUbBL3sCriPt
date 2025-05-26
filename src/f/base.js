// Bubblescript base namespace. This
// namespace contains function which are
// core to the bubblescript namespace and
// are included in the root binding.

const parse = require("../f/parse");
const eval = require("../f/eval");

const List    = require("../o/list");
const Bubbles   = require("../o/bubbles");
const Keyword = require("../o/keyword");
const Fn      = require("../o/fn");
const Macro   = require("../o/macro");
const Symbol  = require("../o/symbol");
const Bubble  = require("../o/bubble");

const _eval = eval.eVaL;

const { map, peek, pop, push, toArray } =
  Bubbles;

const { from: listFromArray } = List;

// Makes a Bubblescript function from a
// Javascript function.
// Params:
//   q: A Javascript function that will be
//   called for this function.
// Returns an annonomous function that is
// sutible for use with bubblescript.
// #coreUtilityFunction
// TODO: Create tests for mkfn.
function mkfn(q) {
  return (p) => {
    return q.call(this,
      p.map(m => _eval(this, m)))
  }
}

class base {
  static muf([key,val]) {
    return this[key.toString()]
      = _eval(this, val);
  }
}

function makeRootBinding() {
  const rootBinding = Object.create();

  getStaticMethods(base);

console.log(staticMethods); // Output: ['myStaticMethod1', 'myStaticMethod2']

}

module.exports = base;
