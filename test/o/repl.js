const readline = require('readline');
const Repl = require("../../src/o/repl");

describe("Repl", function () {
  it("Creates an interactive Bubblescript repl", function () {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    let repl = new Repl(rl);
    rl.close();
  });
});
