assert  = require("assert")
Parser  = require("../src/parser")
List    = require("../src/list")
Symbol  = require("../src/symbol")
type    = require("../src/fns").type

describe 'Parser', ->
  parser = null

  beforeEach ->
    parser = new Parser()

  describe ".parse", ->
    a = b = c = null

    beforeEach ->
      a = new Symbol("a")
      b = new Symbol("b")
      c = new Symbol("c")

    it 'should parse a', ->
      expected = new Symbol("a")
      # expected = new List(expected)
      parser.parse "a", (program) ->
        assertList(program)
        actual = program.peek()
        # assert.equal(actual, expected)
        assert.deepEqual(actual, expected)
        # assertList(actual)
        # assertListEqual(actual, expected)

    # itShouldParse "(1 2 3)", List.from(1,2,3)

    it "should parse (1 2 3)", ->
      expected = new List(1,2,3)
      parser.parse "(1 2 3)", (program) ->
        assertList(program)
        actual = program.peek()
        assertList(actual)
        assertListsEqual(actual, expected)

    it "should parse (a b c)", ->
      expected = new List(a,b,c)
      parser.parse "(a b c)", (program) ->
        assertList(program)
        actual = program.peek()
        assertList(actual)
        assertListsEqual(actual, expected)

    it "should parse (a 3 b 2 c 1)", ->
      expected = new List(a,3,b,2,c,1)
      parser.parse "(a 3 b 2 c 1)", (program) ->
        assertList(program)
        actual = program.peek()
        assertList(actual)
        assertListsEqual(actual, expected)

# itShouldParse = (string, expects) ->
#   it "should parse #{string}", ->
#     parser.parse string, (list) ->
#       assertList(list)
#       actual = list.peek()
#       assertListsEqual(actual, expects)

# Assert list is of type List
assertList = (list) ->
  # console.log(typeof list)
  # assert.typeOf(list, List)
  assert(type(list) == 'List',
    "Expected #{list.toString()} to be of type List, " +
    "but it was not.")

# Assert that two lists are equal.
assertListsEqual = (actual, expected) ->
  # assert(actual.isEqualTo(expected),
  #   "Actual and expected lists were not equal.")

  assert.equal(actual.toString(),
               expected.toString())
  assert.deepEqual(actual, expected)

