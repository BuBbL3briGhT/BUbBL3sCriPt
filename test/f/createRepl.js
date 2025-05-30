const readline = require('readline');
const createRepl = require("../../src/f/createRepl");
const { Readable } = require('stream');

describe("createRepl", function () {
  it("Creates an interactive Bubblescript repl", function () {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    let repl = createRepl(rl);
    rl.close()
  });
});
describe("Repl", function () {
  it("works", function () {
    const mockData = [1, 2, 3, 4, 5];
    const mockStream = createMockReadableStream(mockData);

    mockStream.on('data', (chunk) => {
      console.log('Data:', chunk);
    });

    mockStream.on('end', () => {
      console.log('Stream ended');
    });

  });
});

function createMockReadableStream(data) {
  return new Readable({
    objectMode: true,
    read(size) {
      if (data.length === 0) {
        this.push(null); // Signal the end of the stream
      } else {
        this.push(data.shift());
      }
    },
  });
}

