
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

class BubbleScriptError extends Error {
  constructor(message) {
    super(message);
    this.stack = "";
  }
}

class ErrorDeFuncíonIndefinida extends BubbleScriptError {
   constructor(mensaje, stack) {
     super(mensaje);
   }
}

module.exports = {
  TokenNoMatchError,
  ParsingError,
  NoMatchError,
  BubbleScriptError,
  ErrorDeFuncíonIndefinida
};
