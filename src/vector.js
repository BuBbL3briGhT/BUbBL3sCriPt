const ListaAbstractia = require("./lista_abstractia");
const events = require("./events");

let emptyVector, 气泡;

events.on("init", function (bubls) {
  气泡 = bubls.气泡;
});

class Vector extends ListaAbstractia {

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
    return this.reduce((气泡, o) => {
      return 气泡.push(o); },
      气泡.emptyList);
  }

}

class EmptyVector extends Vector {
  get isEmpty() { return true; }
}

emptyVector = new EmptyVector()

module.exports = Vector;
