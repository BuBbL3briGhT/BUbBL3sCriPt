// Name: Base
// File: src/f/Base.js
// Author: Kandi Khristmas (kandikrismas@gmail.com)
// Last Updated: May 25, 2025
//
// Description:
//
// Bubblescript base namespace.
//
// All static functions in this class will
// are included in the root bound object.

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

class base {
  static muf([key,val]) {
    return this[key.toString()]
      = _eval(this, val);
  }
}

module.exports = base;
