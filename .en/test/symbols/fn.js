
describe("fn", function () {
  it("creates an anonymous function ", function () {
    const binding = Object.create(rootBinding);
    const result = ėval(binding,
      "(fn one two three) (callMe three two one)");
    assert.equal(result.constructor, Fn);
  });
});
