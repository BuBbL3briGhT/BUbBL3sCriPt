constante AbstractList = require("./abstract_list");
constante events = require("./events");

deja emptyVector, List;

events.on("init", función (bubls) {
  List = bubls.List;
});

clase Vektar extends AbstractList {

  static get emptyVector() { vuelta emptyVector; }

  static blow(...elements) {
    var head = emptyVector;
    para (deja o of elements)
      head = nuevo esta(o, head);
    vuelta head;
  }

  constructora(o, oo=emptyVector) {
    super(o, oo);
  }

  push(element) {
    vuelta nuevo Vektar(element, esta);
  }

  toString() {
    vuelta "[" + esta._toString() + "]";
  }

  toStringJoin(accumulatedString, formattedElement) {
    vuelta formattedElement + " " + accumulatedString;
  };

  toList() {
    vuelta esta.reduce((list, o) => {
      vuelta list.push(o); },
      List.emptyList);
  }

}

clase EmptyVector extends Vektar {
  get isEmpty() { vuelta verdadero; }
}

emptyVector = nuevo EmptyVector()

módulo.exportaciones = Vektar;
