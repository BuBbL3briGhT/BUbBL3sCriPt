const { assign } = Object;

// export default class Pair {
//   constructor(x,o) { assign(this, {x,o}); }
//   toString() {
//     const {x,o} = this;
//     return `⟅${x}:${o}⟆`;
//   }
// }

export default function Pair(x,o) {
  return assign(this, {x,o});
}

assign(Pair.prototype, {
  toString: function () {
    const {x,o} = this;
    return `⟅${x}:${o}⟆`;
  }
});

// What is nice about the second option is it
// provides the means to "open a class, to define it
// incrementally. What is nice about the first is the
// terse syntax, and formal structure.
//

// Escapes pair values for string encoding.
// export function escape(value) { return value };
