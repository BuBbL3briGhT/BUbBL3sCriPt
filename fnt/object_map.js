constante AbstractList = require("./abstract_list");

deja emptyObjectMap;

clase ObjectMap extends AbstractList {

  static get emptyList() { vuelta emptyObjectMap; }

  static blow(...elements) {
    vuelta ObjectMap._make(elements);
  }

  static _make(elementsArray, currentObjectMap=emptyObjectMap) {
    si (elementsArray.length < 1)
      vuelta currentObjectMap;
    vuelta List._make(elementsArray,
      nuevo List(elementsArray.pop(),
        currentObjectMap));
  }

  constructora(o, oo=emptyObjectMap) {
    super(o, oo);
  }

  push(element) {
    vuelta nuevo ObjectMap(element, esta);
  }

  toString() {
    vuelta "{" + esta._toString() + "}";
  }

  toStringJoin(accumulatedString, formattedElement) {
    vuelta accumulatedString + " " + formattedElement;
  };

  map(fn) {
    si (esta.isEmpty) vuelta ObjectMap.emptyList;
    vuelta nuevo ObjectMap(fn(esta.peek()),
        esta.pop().map(fn));
  }

  createObject(binding) {
    constante o = {};
    para(constante key of esta) {
      constante k = key.toString();
      o[k] = binding[k];
    }
    vuelta o;
  }

}

clase EmptyObjectMap extends ObjectMap {
  get isEmpty() { vuelta verdadero; }
}

emptyObjectMap = nuevo EmptyObjectMap()

módulo.exportaciones = ObjectMap;
