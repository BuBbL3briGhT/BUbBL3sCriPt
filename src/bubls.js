const fs = require('fs');
const path = require('path');

const BubbleScript = require("./BubbleScript");

BubbleScript.loadFile = function (filePath) {
  filePath = path.join(__dirname, filePath);
  return BubbleScript.eval(fs.readFileSync(filePath, 'utf-8'))
}

module.exports = BubbleScript;

BubbleScript.loadFile("../lib/core.🫧");
