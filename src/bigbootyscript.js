// (((((((((((((((((((ENLARGE)))))))))))))))))))

const Module = require('module');
const fs = require("fs");


function loadFile (filename) {
  let source =
    fs.readFileSync(path, 'utf-8');
  source = expandImports(source);
  return source;
}

function expandImports(source, sourcePath) {
  console.log(source);
  console.log(sourcePath);
  return source;
}


Module._extensions['.bbs'] =
  function (module, filename) {
    const code = BigBootyScript
      .loadFile(filename);
    module._compile(code, filename);
  };


module.exports = { loadFile, expandImports }
