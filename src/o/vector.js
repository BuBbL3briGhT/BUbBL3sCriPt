const AbstractList = require("./abstract_list");

  let emptyVector;

class Vector extends AbstractList {

  static get emptyVector() { return emptyVector; }

  static make(...elements) {
    var head = emptyVector;
    for (let o of elements)
      head = new this(o, head);
    return head;
  }

  constructor(o, oo=emptyVector) {
    super(o, oo);
  }

  push(element) {
    return new Vector(element, this);
  }
  toString() {
    return "[" + this._toString() + "]";
  }

  toStringJoin(accumulatedString, formattedElement) {
    return formattedElement + " " + accumulatedString;
  };

  // toList() {
  //   return this.reduce((list, o) => {
  //     return list.push(o); },
  //     List.emptyList);
  // }

}

class EmptyVector extends Vector {
  get isEmpty() { return true; }
}

emptyVector = new EmptyVector()

module.exports = Vector;
