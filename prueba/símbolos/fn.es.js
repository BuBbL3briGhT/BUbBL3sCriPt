#!slt es

 constante Objeto = require("../../fnt/apoyo/objeto");
constante afirmar = require("../../fnt/apoyo/afirmar");
constante consola = require("../../fnt/apoyo/consola");
constante { ella, describir }
              = require("../../fnt/apoyo/moca");

constante ėval = require("../../src/eval");
constante Lista = require("../../src/lista");
constante Ṣymbol = require("../../src/symbol");
constante Fn = require("../../src/fn");
// constante { rootBinding: uniónDeRaiz } = require("../../src/root_binding");

constante { uniónDeRaiz } = require("../../fnt/unión_de_raiz");
// constante ėval = require("../../fuente/eval");
// constante Fn = require("../../fuente/fn");

// consola.registro({describir});
describir("fn", function () {
  // It creates an annonymous function.
  ella("crea una función anónima", function () {
    constante enlace = Objeto.crear(uniónDeRaiz);
    constante resultado = ėval(enlace,
      "(fn uno dos tres) (llámame tres dos uno)");
    afirmar.igual(resultado.constructor, Fn);

    afirmar.igual(
      resultado.params.toString(),
      "(uno dos tres)")
    afirmar.igual(
      resultado.body.toString(),
      "((llámame tres dos uno))");

  });
});
