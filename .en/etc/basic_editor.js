const readline = require('readline');
const fs = require('fs');

// Basic text representation (in a real editor, this would be more complex)
let text = "This is a simple text editor.";
let cursorPosition = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  // Handle user input (e.g., commands, text)
  if (input === 'save') {
    // Save to a file
    fs.writeFileSync('mytext.txt', text);
  } else if (input === 'exit') {
    // Exit the editor
    rl.close();
  } else {
    // Handle text insertion (add the input to the text)
    text = text.substring(0, cursorPosition) + input + text.substring(cursorPosition);
    cursorPosition += input.length; // Update cursor position
    displayText();
  }
});

// Function to clear the screen and display the text
function displayText() {
  // Clear the screen
  console.clear();
  // Print the text
  console.log(text);
  // Print the cursor (a simple underscore)
  console.log(" ".repeat(cursorPosition) + "_");
}

// Initial display
displayText();
