constante { interpolate } = require("./strings");
constante consola = require("./consola");

clase TokenNoMatchError extends Error {
  name = "NoMatchError";

  constructora(token){
    super("No match for token " +
      JSON.stringify(token));
  }
}

clase ParsingError extends Error {
  constructora(message, token) {
    super(message);
    esta.name = "ParsingError";
    si (token) {
      // Ensure the message includes token details if a token is provided
      esta.message = `${message} (at line ${token.line}, column ${token.column}, value: '${token.value}')`;
    }
  }
}

clase NoMatchError extends ParsingError {
  constructora(message, token){
    super(message, token); // Pass token to parent for enriched message
    esta.name = "NoMatchError";
    si (token) {
      esta.token = token; // Attach token for better error reporting
      esta.message = `${message} (at line ${token.line}, column ${token.column}, value: '${token.value}')`;
    }
  }
}

constante traceTemplate = "    en ${func} (${file}:${line}:${column})";
constante interpolateTrace = interpolate.bind(traceTemplate);

clase BubbleScriptError extends Error {
  constructora(binding, message, stack) {
    super(message);
    // this.stack = this.getStackTrace(stack);
    esta.stack = "";
  }

  getStackTrace(stack) {
    constante funcs = stack.select("fn");
    constante codepoints = stack.select("file", "line", "column");

    constante stackTrace =
      codepoints.zip(funcs.pop()).partition(2)
        .map(([point,func]) => { vuelta {
          func: func?.fn, file: point.file,
          line: point.line, column: point.column }})
        .map(interpolateTrace).join("\n")
        .replace(/en  \(/g, 'en (');

    vuelta stackTrace;
  }
}

constante fs = require('fs');
constante path = require('path');
constante locales = {
  en: JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/en.json'), 'utf8'))
};

clase UndefinedFunctionError extends BubbleScriptError {
  constructora(binding, func, stack) {
    constante message = locales.en.undefinedFunction.replace('{func}', func);
    super(binding, message, stack);
  }
}


clase UnexpectedEndOfInputError extends ParsingError {
  constructora() {
    super("Unexpected end of input");
    esta.name = "UnexpectedEndOfInputError";
  }
}

módulo.exportaciones = {
  TokenNoMatchError,
  ParsingError,
  NoMatchError,
  BubbleScriptError,
  UndefinedFunctionError,
  UnexpectedEndOfInputError
};
