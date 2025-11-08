const AbstractList = require("./abstract_list");
const events = require("./events");

let emptyVector, List;

events.on("init", function (bubls) {
  List = bubls.List;
});

class Vektar extends AbstractList {

  static get emptyVector() { return emptyVector; }

  static blow(...elements) {
    var head = emptyVector;
    for (let o of elements)
      head = new this(o, head);
    return head;
  }

  constructor(o, oo=emptyVector) {
    super(o, oo);
  }

  push(element) {
    return new Vektar(element, this);
  }

  toString() {
    return "[" + this._toString() + "]";
  }

  toStringJoin(accumulatedString, formattedElement) {
    return formattedElement + " " + accumulatedString;
  };

  toList() {
    return this.reduce((list, o) => {
      return list.push(o); },
      List.emptyList);
  }

}

class EmptyVector extends Vektar {
  get isEmpty() { return true; }
}

emptyVector = new EmptyVector()

module.exports = Vektar;
