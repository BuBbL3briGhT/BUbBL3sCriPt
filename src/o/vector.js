const LinkedList = require("./linked_list");

let emptyVector;

class Vector extends LinkedList {

  static listOpenChar = "[";
  static listCloseChar = "]";

  static get empty() { return emptyVector; }

  // Create a vector.
  // constructor(o, oo=emptyVector) {
  //   super(o, oo);
  // }

  // toString() { return toString(this); }
}

// const _toString = LinkedList.toString.toString;
// const toString = _toString.bind(Vector);
// toString.toString = _toString;
// Vector.toString = toString;

class EmptyVector {
  get isEmpty() { return true; }
  *[Symbol.iterator]() { }
  toString() { return "[]"; }
}

emptyVector = new EmptyVector()

module.exports = Vector;
