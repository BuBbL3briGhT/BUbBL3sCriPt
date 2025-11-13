
 const Objeto = require("../../fuente/apoyo/objeto");
const afirmar = require("../../fuente/apoyo/afirmar");
const consola = require("../../fuente/apoyo/consola");
const { ella, describir }
              = require("../../fuente/apoyo/moca");

const ėval = require("../../src/eval");
const Fn = require("../../src/fn");
const { rootBinding: uniónDeRaiz } = require("../../src/root_binding");

// consola.registro({describir});
describir("fn", function () {
  // It creates an annonymous function.
  ella("crea una función anónima", function () {
    const enlace = Objeto.crear(uniónDeRaiz);
    const resultado = ėval(enlace,
      "(fn uno dos tres) (llámame tres dos uno)");
    afirmar.igual(resultado.constructor, Fn);
  });
});
