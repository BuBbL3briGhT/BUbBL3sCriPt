const readline = require('readline');
const Parinfer = require('parinfer'); // Assuming you have the parinfer module installed

// Interactive Bubblescript repl
class Repl {
  constructor () {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
}

function createRepl() {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

module.exports = Repl;
