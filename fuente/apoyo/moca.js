
       const Mocha = require("mocha");
      const Objeto = require("./objeto");
     const consola = require("./consola");

        const Moca = Objeto.crear(Mocha);

         const ella = Objeto.crear(Mocha.it);
    const describir = Objeto.crear(Mocha.describe);

    ella.saltar = Mocha.it.skip;
      ella.sola = Mocha.it.only;
      ella.solo = Mocha.it.only;

    describir.saltar = Mocha.describe.skip;
      describir.sola = Mocha.describe.only;
      describir.solo = Mocha.describe.only;

    Objeto.asignar(Moca, { ella, describir });

      module.exports = Moca;




consola.registro(mocha);
      // const Objeto = require("./objeto");

     // const afirmar = Objeto.crear(assert);

      //  afirmar.igual = afirmar.equal;
      //     afirmar.OK = afirmar.ok;
     // afirmar.muyBien = afirmar.ok;
      //  afirmar.lanza = afirmar.throws;

      // module.exports = afirmar;

