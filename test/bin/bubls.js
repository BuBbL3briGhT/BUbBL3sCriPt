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
});
