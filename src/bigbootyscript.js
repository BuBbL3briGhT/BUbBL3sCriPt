// (((((((((((((((((((ENLARGE)))))))))))))))))))

const Module = require('module');
const fs = require("fs");


function fixImports(source) {
  return source;
}
// (mufn fixImports [source] 'source)


class BigBootyScript {

  loadFile (filename) {
    let source =
      fs.readFileSync(path, 'utf-8');
    source = fixImports(source);
    return source;
  }

}

Module._extensions['.bbs'] =
  function (module, filename) {
    const code = BigBootyScript
      .loadFile(filename);
    module._compile(code, filename);
  };
