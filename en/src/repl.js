const Parinfer = require('parinfer'); // Assuming you have the parinfer module installed

// Interactive Bubblescript repl
class Repl {
  constructor (rl) {
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

module.exports = Repl;
