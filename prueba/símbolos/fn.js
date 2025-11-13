
 const Objeto = require("../../fuente/apoyo/objeto");
const afirmar = require("../../fuente/apoyo/afirmar");
const consola = require("../../fuente/apoyo/consola");
const { ella, describir }
              = require("../../fuente/apoyo/moca");

const ėval = require("../../src/eval");
const List = require("../../src/list");
const Ṣymbol = require("../../src/symbol");
const Fn = require("../../src/fn");
const { rootBinding: uniónDeRaiz } = require("../../src/root_binding");

// const { uniónDeRaiz } = require("../../fuente/unión_de_raiz");
// const ėval = require("../../fuente/eval");
// const Fn = require("../../fuente/fn");

// consola.registro({describir});
describir("fn", function () {
  // It creates an annonymous function.
  ella("crea una función anónima", function () {
    const enlace = Objeto.crear(uniónDeRaiz);
    const resultado = ėval(enlace,
      "(fn uno dos tres) (llámame tres dos uno)");
    afirmar.igual(resultado.constructor, Fn);

    afirmar.igualdadProfunda(
      [...resultado.params],
      [
        Ṣymbol.for("uno"),
        Ṣymbol.for("dos"),
        Ṣymbol.for("tres")
      ]
    )
    // afirmar.igualdadProfunda(
    //   [...resultado.body.map((o) => o.toString())],
    //   [ "llámame", "tres", "dos", "uno" ]
    // );
    afirmar.igual(
      resultado.body.toString(),
      "((llámame tres dos uno))");
  });
});
