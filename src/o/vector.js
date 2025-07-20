const List = require("./list");

let emptyVector;

class Vector extends List {

  static get emptyVector() { return emptyVector; }

  // Create a vector.
  constructor(o, oo=emptyVector) {
    super(o, oo);
  }

  static make(...elements) {
    var head = emptyVector;
    for (let o of elements)
      head = new this(o, head);
    return head;
  }

  toString() {
    return "[" + this._toString() + "]";
  }

}


class EmptyVector extends Vector {
  get isEmpty() { return true; }
}

emptyVector = new EmptyVector()

module.exports = Vector;
