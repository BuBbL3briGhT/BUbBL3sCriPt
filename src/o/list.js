const AbstractList = require("./abstract_list");
const MacroExpanded = require("./macro_expanded");

let emptyList;

class List extends AbstractList {

  static get emptyList() { return emptyList; }

  // static make(...elements) {
  //   var head = emptyList;
  //   elements = elements.reverse();
  //   for (let o of elements)
  //     head = new this(o, head);
  //   return head;
  // }

  static make(...elements) {
    return _make(elements);
  }

  // Create a list.
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    return new List(element, this);
  }

  toString() {
    return "(" + this._toString() + ")";
  }

  toStringJoin(accumulatedString, formattedElement) {
    return accumulatedString + " " + formattedElement;
  };

  toVector() {
    return this.reduce((vector, o) => {
      return vector.push(o); },
      Vector.emptyVector);
  }

  evalEach(binding) {
    return this.each(xpr =>
      _eval(binding, xpr));
  }

  each(fn) {
    let result;
    try {
      result = fn(this.peek());
    } catch (o) {
      if (o instanceof MacroExpanded) {
        let expanded = o.expanded;
        this.o  = expanded.first;
        this.oo = this.rest.conj(expanded.rest.invert());
        return this.each(fn);
      }
    }
    if (this.pop().isEmpty) return result;
    return this.pop().each(fn);
  }

}

function _make(elementsArray, currentLinkedList=emptyList) {
  if (elementsArray.length < 1)
    return currentLinkedList;
  return _make(elementsArray,
    new List(elementsArray.pop(),
      currentLinkedList));
}

class EmptyList extends List {
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

module.exports = List;

const Vector = require("./vector");

const eval = require('../f/eval');
const _eval  = eval.eVaL;
