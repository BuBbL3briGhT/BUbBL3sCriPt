const { exec } = require('child_process');
const assert = require('assert');
const { expect } = require('chai');

describe('bin/bubls', () => {
  it('run a script', (done) => {
    exec('bin/bubls hello_world', (error, stdout, stderr) => {
      expect(error).to.be.null;
      expect(stdout.trim()).to.equal('Hello, world!');
      expect(stderr).to.be.empty;
      done();
    });
  });
  // it('Provide an interactive prompt', (done) => {
  //   exec('bin/bubls', (error, stdout, stderr) => {
  //     expect(error).to.be.null;
  //     // expect(stdout.trim()).to.equal('Hello, world!');
  //     // expect(stderr).to.be.empty;
  //     done();
  //   });
  // });
  // it('Run a hello world program', (done) => {
  //   exec('echo "(console.log \"Hello World\")" | bin/bubls', (error, stdout, stderr) => {
  //     expect(error).to.be.null;
  //     expect(stdout.trim()).to.equal('Hello, world!');
  //     expect(stderr).to.be.empty;
  //     done();
  //   });
  // });
});

// describe('Shell Commands', () => {
//     it('should execute a command and return the correct output', (done) => {
//         exec('echo "Hello, world!"', (error, stdout, stderr) => {
//             expect(error).to.be.null;
//             expect(stdout.trim()).to.equal('Hello, world!');
//             expect(stderr).to.be.empty;
//             done();
//         });
//     });

//     it('should execute a command and return the correct exit code', (done) => {
//         exec('exit 0', (error) => {
//           expect(error).to.be.null;
//           done();
//         });
//     });

//     it('should handle errors from the command', (done) => {
//         exec('command_that_does_not_exist', (error, stdout, stderr) => {
//             expect(error).to.be.an('Error');
//             expect(error.code).to.equal(127);
//             expect(stderr).to.not.be.empty;
//             done();
//         });
//     });
// });
