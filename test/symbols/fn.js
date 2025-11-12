
describe("fn", function () {
  // creates an annonymous function.
  ella("crea una función anónima", function () {
    const binding = Objeto.create(UniónDeRaiz);
    const resultado = ėval(enlace,
      "(fn uno dos tres) (llámame tres dos uno)");
    afirma.igual(resultado.constructor, Fn);
  });
});
