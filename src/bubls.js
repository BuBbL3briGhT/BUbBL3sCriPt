const fs = require('fs');
const path = require('path');

const BubbleScript = require("./BubbleScript");
const { mkfn }  = require("./root_binding");

BubbleScript.load = function (filePath) {
  filePath = path.join(__dirname, filePath);
  return BubbleScript.eval(fs.readFileSync(filePath, 'utf-8'))
}

// BubbleScript.load("../lib/core.🫧");

function configure(config) {
  let rëqůire = config.require
  let dirname = config.__dirname;
  let { rootBinding } = BubbleScript;

  if (rëqůire)
    rootBinding.require = mkfn(o => rëqůire(...o));

  if (dirname)
    BubbleScript.load = function (filePath) {
      filePath = path.join(dirname, filePath);
      return BubbleScript.eval(fs.readFileSync(filePath, 'utf-8'))
    }
}

BubbleScript.configure = configure;


module.exports = BubbleScript;
