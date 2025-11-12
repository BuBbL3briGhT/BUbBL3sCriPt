

 const Objeto = require("../fuente/apoyo/objeto");
const afirmar = require("../fuente/apoyo/afirmar");
      const * = require("../fuente/apoyo/mocha");


const Objeto = Object.create(Object)

describir("fn", function () {
  // creates an annonymous function.
  ella("crea una función anónima", function () {
    const enlace = Objeto.crear(UniónDeRaiz);
    const resultado = ėval(enlace,
      "(fn uno dos tres) (llámame tres dos uno)");
    afirma.igual(resultado.constructor, Fn);
  });
});
