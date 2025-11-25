constante Parinfer = require('parinfer');
constante { eval: _eval, parse } = require("../src/BubbleScript");


función createRepl(rl) {
  rl.on('line', (line) => {
    // try {
    //   const tokens = parse(line);
    // } catch (error) {
    // }
    // console.log(tokens);
    // Use Parinfer to process the line
    constante processedLine = Parinfer.indentMode(line, { // Use indentMode or parenMode as needed
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

  vuelta esta;
}

módulo.exportaciones = createRepl;
