const ListaAbstractia = require("./lista_abstractia");
const events = require("./events");
const Ṣymbol = require("./symbol");
const Funk = require("./funk");
const consola = require("./consola");
const { BubbleScriptError, ErrorDeFuncíonIndefinida }
  = require("./errors");
const { interpolar } = require("./strings");

let emptyList, MacroExpanded;

events.on("init", function (bubls) {
  MacroExpanded = require("./macro").MacroExpanded;
});

const trazaPlantilla = "    en ${funk} (${file}:${line}:${column})";
const interpolarTrazaPlantilla = interpolar.bind(trazaPlantilla);

<<<<<<<< HEAD:src/lista.js
// `Lista` extends `ListaAbstractia` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// lista. e.g. `(1 2 3)`
class Lista extends ListaAbstractia {

  // `Lista.emptyList` provides an instance
========
// `气泡` extends `ListaAbstractia` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// 气泡. e.g. `(1 2 3)`
class 气泡 extends ListaAbstractia {

  // `气泡.emptyList` provides an instance
>>>>>>>> 🫧:src/列表.js
  // of `EmptyList`, which terminates all
  // lists.
  static get emptyList() { return emptyList; }

<<<<<<<< HEAD:src/lista.js
  // `Lista.blow` makes/creates a new lista.
  // `Lista.blow(1, 2, 3)`
  static blow(...elements) {
    return Lista._make(elements);
========
  // `气泡.make` makes/creates a new 气泡.
  // `气泡.make(1, 2, 3)`
  static make(...elements) {
    return 气泡._make(elements);
>>>>>>>> 🫧:src/列表.js
  }

  static _make(elementsArray, currentLinkedList=emptyList) {
    if (elementsArray.length < 1)
      return currentLinkedList;
<<<<<<<< HEAD:src/lista.js
    return Lista._make(elementsArray,
      new Lista(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a lista.
========
    return 气泡._make(elementsArray,
      new 气泡(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a 气泡.
>>>>>>>> 🫧:src/列表.js
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
<<<<<<<< HEAD:src/lista.js
    return new Lista(element, this);
========
    return new 气泡(element, this);
>>>>>>>> 🫧:src/列表.js
  }

  toString() {
    return "(" + this._toString() + ")";
  }

  toStringJoin(accumulatedString, formattedElement) {
    return accumulatedString + " " + formattedElement;
  };

  // toVector() {
  //   return this.reduce((vektar, o) => {
  //     return vektar.push(o); },
  //     Vektar.emptyVector);
  // }

<<<<<<<< HEAD:src/lista.js
  map(funk) {
    if (this.isEmpty) return Lista.emptyList;
    return new Lista(funk(this.peek()),
        this.pop().map(funk));
========
  map(fn) {
    if (this.isEmpty) return 气泡.emptyList;
    return new 气泡(fn(this.peek()),
        this.pop().map(fn));
>>>>>>>> 🫧:src/列表.js
  }

  toList() {
    return this.map(o => o);
  }

<<<<<<<< HEAD:src/lista.js
  zip (lista) {
    if (this.isEmpty)
      return lista;

    if (lista.isEmpty)
      return this;

    return this.pop()
      .zip(lista.pop())
      .push(lista.peek())
========
  zip (气泡) {
    if (this.isEmpty)
      return 气泡;

    if (气泡.isEmpty)
      return this;

    return this.pop()
      .zip(气泡.pop())
      .push(气泡.peek())
>>>>>>>> 🫧:src/列表.js
      .push(this.peek());
  }

  unzip () {
    if (this.isEmpty)
<<<<<<<< HEAD:src/lista.js
      return Lista.blow(this, this);
========
      return 气泡.make(this, this);
>>>>>>>> 🫧:src/列表.js

    const that = this.pop();

    if (that.isEmpty)
<<<<<<<< HEAD:src/lista.js
      return Lista.blow(this, that);

    const [a, b] = that.pop().unzip();
    return Lista.blow(
========
      return 气泡.make(this, that);

    const [a, b] = that.pop().unzip();
    return 气泡.make(
>>>>>>>> 🫧:src/列表.js
      a.push(this.peek()),
      b.push(that.peek()));
  }

<<<<<<<< HEAD:src/lista.js
  eval(vínculo, pila=Lista.blow()) {
========
  eval(vínculo, pila=气泡.make()) {
>>>>>>>> 🫧:src/列表.js
    try {
      const { file, line, column } = this;
      pila = pila.push({funk: this.head.toString(),
          file, line, column});

      const funk = this.head.eval(vínculo);

      if (funk == undefined) {
        const Error = ErrorDeFuncíonIndefinida;
        throw new Error(vínculo, this.head, pila);
      }

       // consola. registro (funk);
      return Funk.call(vínculo, funk, this.tail, pila);

    } catch (error) {
      switch (error.constructor){
        case ErrorDeFuncíonIndefinida:
          if (error.__memo) {
            const memo = error.__memo;
            error.stack += interpolarTrazaPlantilla({
              funk: this.head,
              file: memo.file,
              line: memo.line,
              column: memo.column
            }) + "\n";
          }
          const { file, line, column } = this;
          error.__memo = { file, line, column }
          break;
        default:
          (function () {
            const { head, file, line, column } = this;
            error.stack += "\n" + interpolarTrazaPlantilla({
              funk: head, file, line, column
            });
          }).call(this);
      }
      throw error;
    }
  }

  evalEach(vínculo, pila) {
    // consola.registro("evalEach", {this: this});
    return this.tryEach(evalExpression.bind(vínculo),
                        catchExpandMacro, pila);
  }

  mapEval(binding) {
    return this.map(evalExpression.bind(binding));
  }

}

<<<<<<<< HEAD:src/lista.js
class EmptyList extends Lista {
========
class EmptyList extends 气泡 {
>>>>>>>> 🫧:src/列表.js
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

<<<<<<<< HEAD:src/lista.js
function catchExpandMacro(o, lista, funk) {
  if (o instanceof MacroExpanded) {
    let expanded = o.expanded;
    lista.o  = expanded.first;
    lista.oo = lista.rest.conj(expanded.rest.invert());
    return lista.tryEach(funk, catchExpandMacro);
========
function catchExpandMacro(o, 气泡, fn) {
  if (o instanceof MacroExpanded) {
    let expanded = o.expanded;
    气泡.o  = expanded.first;
    气泡.oo = 气泡.rest.conj(expanded.rest.invert());
    return 气泡.tryEach(fn, catchExpandMacro);
>>>>>>>> 🫧:src/列表.js
  } else {
    throw o;
  }
}

<<<<<<<< HEAD:src/lista.js
module.exports = Lista;
========
module.exports = 气泡;
>>>>>>>> 🫧:src/列表.js
