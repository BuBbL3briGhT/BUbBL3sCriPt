const { interpolate } = require("./strings");
const consola = require("./consola");

class TokenNoMatchError extends Error {
  name = "NoMatchError";

  constructor(token){
    super("No match for token " +
      JSON.stringify(token));
  }
}

class ParsingError extends Error {
  constructor(message, token) {
    super(message);
    this.name = "ParsingError";
    if (token) {
      // Ensure the message includes token details if a token is provided
      this.message = `${message} (at line ${token.line}, column ${token.column}, value: '${token.value}')`;
    }
  }
}

class NoMatchError extends ParsingError {
  constructor(message, token){
    super(message, token); // Pass token to parent for enriched message
    this.name = "NoMatchError";
    if (token) {
      this.token = token; // Attach token for better error reporting
      this.message = `${message} (at line ${token.line}, column ${token.column}, value: '${token.value}')`;
    }
  }
}

const traceTemplate = "    en ${func} (${file}:${line}:${column})";
const interpolateTrace = interpolate.bind(traceTemplate);

class BubbleScriptError extends Error {
  constructor(binding, message, stack) {
    super(message);
    // this.stack = this.getStackTrace(stack);
    this.stack = "";
  }

  getStackTrace(stack) {
    const funcs = stack.select("fn");
    const codepoints = stack.select("file", "line", "column");

    const stackTrace =
      codepoints.zip(funcs.pop()).partition(2)
        .map(([point,func]) => { return {
          func: func?.fn, file: point.file,
          line: point.line, column: point.column }})
        .map(interpolateTrace).join("\n")
        .replace(/en  \(/g, 'en (');

    return stackTrace;
  }
}

const fs = require('fs');
const path = require('path');
const locales = {
  en: JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/en.json'), 'utf8'))
};

class UndefinedFunctionError extends BubbleScriptError {
  constructor(binding, func, stack) {
    const message = locales.en.undefinedFunction.replace('{func}', func);
    super(binding, message, stack);
  }
}


class UnexpectedEndOfInputError extends ParsingError {
  constructor() {
    super("Unexpected end of input");
    this.name = "UnexpectedEndOfInputError";
  }
}

module.exports = {
  TokenNoMatchError,
  ParsingError,
  NoMatchError,
  BubbleScriptError,
  UndefinedFunctionError,
  UnexpectedEndOfInputError
};
