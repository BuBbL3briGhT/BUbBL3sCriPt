const Parinfer = require('parinfer');
const eval = require("../../src/f/eval");
const parse = require("../../src/f/parse");

function createRepl(rl) {
  rl.on('line', (line) => {
    // try {
    //   const tokens = parse(line);
    // } catch (error) {
    // }
    // console.log(tokens);
    // Use Parinfer to process the line
    const processedLine = Parinfer.indentMode(line, { // Use indentMode or parenMode as needed
      // Parinfer options
    });

    // Display the processed line (or handle errors/changes)
    console.log(processedLine.text);
    // console.log(processedLine);
    eval(processedLine.text);
    // eval(line);

  });

  rl.on('close', () => {
    console.log('Readline interface closed.');
  });

  return this;
}

module.exports = createRepl;
