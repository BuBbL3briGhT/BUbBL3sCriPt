assert  = require("assert")
Parser  = require("../src/parser")
List    = require("../src/list")
type    = require("../src/fns").type

describe 'Parser', ->
  parser = null

  beforeEach ->
    parser = new Parser()

  describe ".parse", ->
    a = b = c = null

    beforeEach ->
      a = Symbol.for("a")
      b = Symbol.for("b")
      c = Symbol.for("c")

    it 'should parse a', ->
      expected = a
      parser.parse "a", (program) ->
        actual = program.peek()
        assert.equal(actual, expected)

    it "should parse (1 2 3)", ->
      expected = new List(1,2,3)
      parser.parse "(1 2 3)", (program) ->
        actual = program.peek()
        assertList(actual)
        assertListsEqual(actual, expected)

    it "should parse (a b c)", ->
      expected = new List(a,b,c)
      parser.parse "(a b c)", (program) ->
        actual = program.peek()
        assertList(actual)
        assertListsEqual(actual, expected)

    it "should parse (a 3 b 2 c 1)", ->
      expected = new List(a,3,b,2,c,1)
      parser.parse "(a 3 b 2 c 1)", (program) ->
        actual = program.peek()
        assertList(actual)
        assertListsEqual(actual, expected)

assertList = (list) ->
  assert(type(list) == 'List')

assertListsEqual = (actual, expected) ->
  assert.deepEqual(actual, expected)

