const AbstractList = require("./lista_abstractia");
const events = require("./events");
const Ṣymbol = require("./symbol");
const Funk = require("./funk");
const consola = require("./consola");
const { BubbleScriptError, UndefinedFunctionError }
  = require("./errors");
const { interpolate } = require("./strings");

let emptyList, MacroExpanded;

events.on("init", function (bubls) {
  MacroExpanded = require("./macro").MacroExpanded;
});

const traceTemplate = "    en ${func} (${file}:${line}:${column})";
const interpolateTrace = interpolate.bind(traceTemplate);

/**
 * @class Bubble
 * @extends AbstractList
 * @description The primary data structure in Bubblescript, representing a Lisp-like list.
 * @example
 * const bubble = Bubble.blow(1, 2, 3);
 * // => (1 2 3)
 */
class Bubble extends AbstractList {

  /**
   * @static
   * @property {EmptyList} emptyList - An instance of `EmptyList`, which terminates all lists.
   */
  static get emptyList() { return emptyList; }

  /**
   * @static
   * @method blow
   * @description Creates a new bubble.
   * @param {...*} elements - The elements to add to the bubble.
   * @returns {Bubble} The new bubble.
   * @example
   * const bubble = Bubble.blow(1, 2, 3);
   * // => (1 2 3)
   */
  static blow(...elements) {
    return Bubble._make(elements);
  }

  static _make(elementsArray, currentLinkedList=emptyList) {
    if (elementsArray.length < 1)
      return currentLinkedList;
    return Bubble._make(elementsArray,
      new Bubble(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a bubble.
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    return new Bubble(element, this);
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

  map(func) {
    if (this.isEmpty) return Bubble.emptyList;
    return new Bubble(func(this.peek()),
        this.pop().map(func));
  }

  toList() {
    return this.map(o => o);
  }

  zip (bubble) {
    if (this.isEmpty)
      return bubble;

    if (bubble.isEmpty)
      return this;

    return this.pop()
      .zip(bubble.pop())
      .push(bubble.peek())
      .push(this.peek());
  }

  unzip () {
    if (this.isEmpty)
      return Bubble.blow(this, this);

    const that = this.pop();

    if (that.isEmpty)
      return Bubble.blow(this, that);

    const [a, b] = that.pop().unzip();
    return Bubble.blow(
      a.push(this.peek()),
      b.push(that.peek()));
  }

  /**
   * @method eval
   * @description Evaluates the bubble as a function call.
   * @param {Object} binding - The binding to evaluate the bubble in.
   * @param {Bubble} [stack=Bubble.blow()] - The evaluation stack.
   * @returns {*} The result of the function call.
   */
  eval(binding, stack=Bubble.blow()) {
    try {
      const { file, line, column } = this;
      stack = stack.push({func: this.head.toString(),
          file, line, column});

      const func = this.head.eval(binding);

      if (func == undefined) {
        const Error = UndefinedFunctionError;
        throw new Error(binding, this.head, stack);
      }

       // consola. registro (func);
      return Funk.call(binding, func, this.tail, stack);

    } catch (error) {
      switch (error.constructor){
        case UndefinedFunctionError:
          if (error.__memo) {
            const memo = error.__memo;
            error.stack += interpolateTrace({
              func: this.head,
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
            error.stack += "\n" + interpolateTrace({
              func: head, file, line, column
            });
          }).call(this);
      }
      throw error;
    }
  }

  /**
   * @method evalEach
   * @description Evaluates each element of the bubble and returns the result of the last evaluation.
   * @param {Object} binding - The binding to evaluate the elements in.
   * @param {Bubble} [stack=Bubble.blow()] - The evaluation stack.
   * @returns {*} The result of the last evaluation.
   */
  evalEach(binding, stack) {
    // consola.registro("evalEach", {this: this});
    return this.tryEach(evalExpression.bind(binding),
                        catchExpandMacro, stack);
  }

  mapEval(binding) {
    return this.map(evalExpression.bind(binding));
  }

}

class EmptyList extends Bubble {
  get isEmpty() { return true; }
}

emptyList = new EmptyList()

function catchExpandMacro(o, bubble, funk) {
  if (o instanceof MacroExpanded) {
    let expanded = o.expanded;
    bubble.o  = expanded.first;
    bubble.oo = bubble.rest.conj(expanded.rest.invert());
    return bubble.tryEach(funk, catchExpandMacro);
  } else {
    throw o;
  }
}

module.exports = Bubble;
