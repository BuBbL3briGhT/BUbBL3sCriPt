const ListaAbstracta = require("./lista_abstracta");
const events = require("./events");

let emptyVector, BubbleButt;

events.on("init", function (bubls) {
  BubbleButt = bubls.BubbleButt;
});

class Vector extends ListaAbstracta {

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

  toList() {
    return this.reduce((bubbleButt, o) => {
      return bubbleButt.push(o); },
      BubbleButt.emptyList);
  }

}

class EmptyVector extends Vector {
  get isEmpty() { return true; }
}

emptyVector = new EmptyVector()

module.exports = Vector;
