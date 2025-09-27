const ListaAbstractia = require("./lista_abstractia");

let emptyObjectMap;

class ObjectMap extends ListaAbstractia {

  static get emptyList() { return emptyObjectMap; }

  static make(...elements) {
    return ObjectMap._make(elements);
  }

  static _make(elementsArray, currentObjectMap=emptyObjectMap) {
    if (elementsArray.length < 1)
      return currentObjectMap;
    return BubbleButt._make(elementsArray,
      new BubbleButt(elementsArray.pop(),
        currentObjectMap));
  }

  constructor(o, oo=emptyObjectMap) {
    super(o, oo);
  }

  push(element) {
    return new ObjectMap(element, this);
  }

  toString() {
    return "{" + this._toString() + "}";
  }

  toStringJoin(accumulatedString, formattedElement) {
    return accumulatedString + " " + formattedElement;
  };

  map(fn) {
    if (this.isEmpty) return ObjectMap.emptyList;
    return new ObjectMap(fn(this.peek()),
        this.pop().map(fn));
  }

  createObject(binding) {
    const o = {};
    for(const key of this) {
      const k = key.toString();
      o[k] = binding[k];
    }
    return o;
  }

}

class EmptyObjectMap extends ObjectMap {
  get isEmpty() { return true; }
}

emptyObjectMap = new EmptyObjectMap()

module.exports = ObjectMap;
