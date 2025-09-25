const { interpolar } = require("./strings");
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

// const trazaPlantilla = "    en ${nombre} (${archivo}:${linea}:${columna})";
const trazaPlantilla = "    en ${fn} (${file}:${line}:${column})";
const interpolarTrazaPlantilla = interpolar.bind(trazaPlantilla);

class BubbleScriptError extends Error {
  constructor(vínculo, mensaje, pila) {
    super(mensaje);
    this.stack = this.obtenerTrazaDeLaPila(pila);
  }

  obtenerTrazaDeLaPila(pila) {
    consola.registro({ pila: pila.toString() });
    const trazaDeLaPila = pila
      .map(interpolarTrazaPlantilla).join("\n");
    return trazaDeLaPila;
  }
}

class ErrorDeFuncíonIndefinida extends BubbleScriptError {
   constructor(vínculo, funcíon, pila) {
     const mensaje = "La funcíon \"" + funcíon
                   + "\" no está definida.";
     super(vínculo, mensaje, pila);
   }
}

module.exports = {
  TokenNoMatchError,
  ParsingError,
  NoMatchError,
  BubbleScriptError,
  ErrorDeFuncíonIndefinida
};
