const LinkedList = require("./linked_list");

let emptyVector;

class Vector extends LinkedList {

  static linkedListOpenChar = "[";
  static linkedListCloseChar = "]";

  static get emptyVector() { return emptyVector; }

  // Create a vector.
  constructor(o, oo=emptyVector) {
    super(o, oo);
  }

}

class EmptyVector {
  get isEmpty() { return true; }
}

emptyVector = new EmptyVector()

module.exports = Vector;
