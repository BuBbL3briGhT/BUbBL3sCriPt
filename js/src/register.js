const Module = require('module');

Module._extensions['.bubls'] = function (module, filename) {
  const code = "require('./src/bubblescript').loadFile('" + filename + "');"
  module._compile(code, filename);
};

