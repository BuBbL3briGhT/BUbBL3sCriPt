const List = require("./list");

let emptyVector;

class Vector extends List {

  // static listOpenChar = "[";
  // static listCloseChar = "]";

  static get empty() { return emptyVector; }

  // Create a vector.
  constructor(o, oo=emptyVector) {
    super(o, oo);
  }

  static make(...elements) {
    var head = this.emptyList;
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
