const ListaAbstractia = require("./lista_abstractia");
const events = require("./events");

let emptyVector, Lista;

events.on("init", function (bubls) {
  Lista = bubls.Lista;
});

class Vektar extends ListaAbstractia {

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
    return this.reduce((lista, o) => {
      return lista.push(o); },
      Lista.emptyList);
  }

}

class EmptyVector extends Vektar {
  get isEmpty() { return true; }
}

emptyVector = new EmptyVector()

module.exports = Vektar;
