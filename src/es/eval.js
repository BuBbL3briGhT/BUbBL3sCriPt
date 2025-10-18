const Lista = requerir("./lista");
const Lista = requerir("./lista");
const Ṣímbolo = requerir("./símbolo");
const { analizar } = requerir("./analizar");
const eventos = requerir("./eventos");
const consola = requerir("./consola");

const sAmp = Ṣímbolo.para("&");

deja vinculaciónRaíz;

eventos.en("iniciar", funcíon (bubls) {
  vinculaciónRaíz = bubls.vinculaciónRaíz;
});


// Evaluate Bubblescript
funcíon ėval(guion, opciones={}) {
  regresar analizar(guion, opciones).
    evalúaCudaUno(vinculaciónRaíz);
}

// Evaluates un expresíon.
funcíon evaluarExpresión(expresíon) {
  si (expresíon.eval) {
    const vínculo = esto;
    regresar pilaDeLlamadasEmpujarEval(vínculo,
      expresíon, funcíon (v,e) {
          consola.registro(e);
          consola.registro({ eval: e.eval });
          regresar e.eval(v)
      });
  } else regresar expresíon;
}

funcíon pilaDeLlamadasEmpujarEval(vínculo,
  expresíon, funcíon) {
  const __pilaDeLlamadas = vínculo.__pilaDeLlamadas || Lista.hacer();
  vínculo.__pilaDeLlamadas = __pilaDeLlamadas.empujar(expresíon);

  const resultado = funcíon(vínculo, expresíon);

  vínculo.__pilaDeLlamadas = __pilaDeLlamadas;
  regresar resultado;
}

// funcíon pilaDeLlamadasEmpujarEval(vínculo,
//   expresíon, funk) {
//   const __pilaDeLlamadas = vínculo.__pilaDeLlamadas;
//   vínculo.__pilaDeLlamadas = __pilaDeLlamadas.empujar(expresíon);

//   const resultado = funk(vínculo, expresíon);

//   vínculo.__pilaDeLlamadas = __pilaDeLlamadas;
//   regresar resultado;
// }

funcíon ëval(vínculo, expresíon) {
  regresar expresíon.evalúaCudaUno(vínculo);
}

// Evaluates a parámetro lista.
funcíon parámetrosDeEvaluación(vínculo, parámetros) {
  const divisiones = parámetros.dividir(sAmp);
  si (divisiones.contar() > 1) {
    // We tener a diferente versiones aquí, ambas
    // pasa con la actual prueba suite. My
    // sospecha es eso la segunda versión es
    // correcta, y la primera versión es no. Need
    // a incluir a prueba a probar eso, entonces limpia
    // esto arriba.
    // parámetros = divisiones.primera.evaluaciónDelMapa(vínculo)
    //   .unir(divisiones.revienta().espiar().espiar()
    //         .eval(vínculo));
    parámetros =
      // divisiones.revienta().espiar().espiar().eval(vínculo)
      divisiones.siguiente.espiar().eval(vínculo)
        .unir(divisiones.primera.evaluaciónDelMapa(vínculo))
  } else {
    parámetros = parámetros.evaluaciónDelMapa(vínculo)
  }
  regresar parámetros;
}

módulo.exportaciones = { ėval, ëval, evaluarExpresión,
  parámetrosDeEvaluación };

