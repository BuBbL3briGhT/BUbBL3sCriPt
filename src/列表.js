const AbstractList = require("./abstract_list");
const events = require("./events");
const Ṣymbol = require("./symbol");
const Fn = require("./fn");
const consola = require("./consola");
const { BubbleScriptError, ErrorDeFuncíonIndefinida }
  = require("./errors");
const { interpolar } = require("./strings");

let emptyList, MacroExpanded;

events.on("init", function (bubls) {
  MacroExpanded = require("./macro").MacroExpanded;
});

const trazaPlantilla = "    en ${fn} (${file}:${line}:${column})";
const interpolarTrazaPlantilla = interpolar.bind(trazaPlantilla);

<<<<<<<< HEAD:src/list.js
// `List` extends `AbstractList` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// list. e.g. `(1 2 3)`
class List extends AbstractList {

  // `List.emptyList` provides an instance
========
// `气泡` extends `AbstractList` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// 气泡. e.g. `(1 2 3)`
class 气泡 extends AbstractList {

  // `气泡.emptyList` provides an instance
>>>>>>>> 🫧:src/列表.js
  // of `EmptyList`, which terminates all
  // lists.
  static get emptyList() { return emptyList; }

<<<<<<<< HEAD:src/list.js
  // `List.blow` makes/creates a new list.
  // `List.blow(1, 2, 3)`
  static blow(...elements) {
    return List._make(elements);
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
<<<<<<<< HEAD:src/list.js
    return List._make(elementsArray,
      new List(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a list.
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
<<<<<<<< HEAD:src/list.js
    return new List(element, this);
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

<<<<<<<< HEAD:src/list.js
  map(fn) {
    if (this.isEmpty) return List.emptyList;
    return new List(fn(this.peek()),
        this.pop().map(fn));
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

<<<<<<<< HEAD:src/list.js
  zip (list) {
    if (this.isEmpty)
      return list;

    if (list.isEmpty)
      return this;

    return this.pop()
      .zip(list.pop())
      .push(list.peek())
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
<<<<<<<< HEAD:src/list.js
      return List.blow(this, this);
========
      return 气泡.make(this, this);
>>>>>>>> 🫧:src/列表.js

    const that = this.pop();

    if (that.isEmpty)
<<<<<<<< HEAD:src/list.js
      return List.blow(this, that);

    const [a, b] = that.pop().unzip();
    return List.blow(
========
      return 气泡.make(this, that);

    const [a, b] = that.pop().unzip();
    return 气泡.make(
>>>>>>>> 🫧:src/列表.js
      a.push(this.peek()),
      b.push(that.peek()));
  }

<<<<<<<< HEAD:src/list.js
  eval(vínculo, pila=List.blow()) {
========
  eval(vínculo, pila=气泡.make()) {
>>>>>>>> 🫧:src/列表.js
    try {
      const { file, line, column } = this;
      pila = pila.push({fn: this.head.toString(),
          file, line, column});

      const fn = this.head.eval(vínculo);

      if (fn == undefined) {
        const Error = ErrorDeFuncíonIndefinida;
        throw new Error(vínculo, this.head, pila);
      }

       // consola. registro (fn);
      return Fn.call(vínculo, fn, this.tail, pila);

    } catch (error) {
      switch (error.constructor){
        case ErrorDeFuncíonIndefinida:
          if (error.__memo) {
            const memo = error.__memo;
            error.stack += interpolarTrazaPlantilla({
              fn: this.head,
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
              fn: head, file, line, column
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

<<<<<<<< HEAD:src/list.js
class EmptyList extends List {
========
class EmptyList extends 气泡 {
>>>>>>>> 🫧:src/列表.js
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

<<<<<<<< HEAD:src/list.js
function catchExpandMacro(o, list, fn) {
  if (o instanceof MacroExpanded) {
    let expanded = o.expanded;
    list.o  = expanded.first;
    list.oo = list.rest.conj(expanded.rest.invert());
    return list.tryEach(fn, catchExpandMacro);
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

<<<<<<<< HEAD:src/list.js
module.exports = List;
========
module.exports = 气泡;
>>>>>>>> 🫧:src/列表.js
