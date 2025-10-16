const Parinfer = require('parinfer');
const { eval: _eval, parse } = require("../src/BubbleScript");


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
    _eval(processedLine.text);
    // _eval(line);

  });

  rl.on('close', () => {
    console.log('Readline interface closed.');
  });

  return this;
}

module.exports = createRepl;
