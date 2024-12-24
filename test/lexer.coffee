assert = require("assert")
Lexer  = require("../src/lexer")
Token  = require("../src/token")

describe 'Lexer', ->
  lexer = null

  beforeEach ->
    lexer = new Lexer

  describe "#tokenize", ->
    it 'should tokenize "a"', ->
      lexer.tokenize "a", (tokens, values) ->
        assert.equal(tokens.head, Token.SYMBOL)
        assert.equal(values.head, "a")
        assert.equal(tokens.count(), 1)
        assert.equal(values.count(), 1)

    it 'should tokenize "(a b c)"', ->
      lexer.tokenize "(a b c)", (t, v) ->
        assert.deepEqual(t.toArray(),
          "(YYY)".split(''))
        assert.deepEqual(v.toArray(),
          [undefined, "a", "b", "c", undefined])

    it 'should tokenize "(+ 2 3)"', ->
      lexer.tokenize "(+ 2 3)", (tokens, values) ->
        assert.deepEqual(tokens.toArray(),
          "(YNN)".split(''))
        assert.deepEqual(values.toArray(),
          [undefined, "+", 2, 3, undefined])
