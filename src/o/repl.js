const readline = require('readline');
const Parinfer = require('parinfer'); // Assuming you have the parinfer module installed

// Interactive Bubblescript repl
class Repl {
  constructor () {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on('line', (line) => {
      // Use Parinfer to process the line
      const processedLine = Parinfer.indentMode(line, { // Use indentMode or parenMode as needed
        // Parinfer options
      });

      // Display the processed line (or handle errors/changes)
      console.log(processedLine);
    });

    rl.on('close', () => {
      console.log('Readline interface closed.');
    });
  }
}

function createRepl() {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (line) => {
    // Use Parinfer to process the line
    const processedLine = Parinfer.indentMode(line, { // Use indentMode or parenMode as needed
      // Parinfer options
    });

    // Display the processed line (or handle errors/changes)
    console.log(processedLine);
  });

  rl.on('close', () => {
    console.log('Readline interface closed.');
  });

  return this;
}

module.exports = Repl;
