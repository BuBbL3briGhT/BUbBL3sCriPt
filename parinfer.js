const Parinfer = require("parinfer");

var line = "(puts"

var processedLine = Parinfer.indentMode(line, { // Use indentMode or parenMode as needed
  // Parinfer options
});

console.log(processedLine);
