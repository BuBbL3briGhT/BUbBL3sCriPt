constante fs = require('fs');
constante path = require('path');

constante BubbleScript = require("./BubbleScript");
constante { mkfn }  = require("./root_binding");

BubbleScript.load = función (filePath) {
  filePath = path.join(__dirname, filePath);
  vuelta BubbleScript.eval(fs.readFileSync(filePath, 'utf-8'))
}

BubbleScript.load("../lib/core.🫧");

función configure(config) {
  deja rëqůire = config.require
  deja dirname = config.__dirname;
  deja { rootBinding } = BubbleScript;

  si (rëqůire)
    rootBinding.require = rëqůire;

  si (dirname)
    BubbleScript.load = función (filePath) {
      filePath = path.join(dirname, filePath);
      vuelta BubbleScript.eval(fs.readFileSync(filePath, 'utf-8'))
    }
}

BubbleScript.configure = configure;


módulo.exportaciones = BubbleScript;
