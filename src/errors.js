const interpolar = require("./strings");

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

const trazaPlantilla = "    en ${nombre} (${archivo}:${linea}:${columna})";

class BubbleScriptError extends Error {
  constructor(vínculo, mensaje) {
    super(mensaje);
    this.stack = this.obtenerTrazaDeLaPila(vínculo);
  }

  obtenerTrazaDeLaPila(vínculo) {
    const pila = vínculo.__pila;
    const trazaDeLaPila = pila.map((o) => {
      return interpolar(trazaPlantilla, o);
    }).join("\n");
    return trazaDeLaPila;
  }
}

class ErrorDeFuncíonIndefinida extends BubbleScriptError {
   constructor(vínculo, funcíon) {
     const mensaje = "La funcíon \"" + this.head
                   + "\" no está definida.";
     super(vínculo, mensaje);
   }
}

module.exports = {
  TokenNoMatchError,
  ParsingError,
  NoMatchError,
  BubbleScriptError,
  ErrorDeFuncíonIndefinida
};
