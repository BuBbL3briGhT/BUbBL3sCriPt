const Parinfer = require('parinfer');
const eval = require("../../src/f/eval");

function createRepl(rl) {
  rl.on('line', (line) => {
    // Use Parinfer to process the line
    const processedLine = Parinfer.indentMode(line, { // Use indentMode or parenMode as needed
      // Parinfer options
    });

    // Display the processed line (or handle errors/changes)
    console.log(processedLine.text);
    eval(processedLine);
    // eval(line);

  });

  rl.on('close', () => {
    console.log('Readline interface closed.');
  });

  return this;
}

module.exports = createRepl;
