
       const Mocha = require("mocha");
      const Objeto = require("./objeto");
     const consola = require("./consola");

        const Moca = Objeto.crear(Mocha);

         Moca.ella = Objeto.crear(Mocha.it);
    Moca.describir = Objeto.crear(Mocha.describe);

    Moca.ella.saltar = Mocha.it.skip;
      Moca.ella.sola = Mocha.it.only;
      Moca.ella.solo = Mocha.it.only;

    Moca.describir.saltar = Mocha.describe.skip;
      Moca.describir.sola = Mocha.describe.only;
      Moca.describir.solo = Mocha.describe.only;

      module.exports = Moca;




consola.registro(mocha);
      // const Objeto = require("./objeto");

     // const afirmar = Objeto.crear(assert);

      //  afirmar.igual = afirmar.equal;
      //     afirmar.OK = afirmar.ok;
     // afirmar.muyBien = afirmar.ok;
      //  afirmar.lanza = afirmar.throws;

      // module.exports = afirmar;

