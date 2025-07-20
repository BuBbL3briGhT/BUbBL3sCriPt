const AbstractList = require("./abstract_list");

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
