const readline = require('readline');
const createRepl = require("../../src/f/createRepl");

describe("createRepl", function () {
  it("Creates an interactive Bubblescript repl", function () {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    let repl = createRepl(rl);
    rl.close()
  });
});
