assert  = require("assert")
Parser  = require("../src/parser")
List    = require("../src/list")
Symbol  = require("../src/symbol")

describe 'Parser', ->
  parser = null

  beforeEach ->
    parser = new Parser()

  describe ".parse", ->

    it "should parse (1 2 3)", ->
      e = new List(1,2,3)
      parser.parse "(1 2 3)", (pRoGrAm) ->
        assert.equal(pRoGrAm.toString(), "((1 2 3))")
        assert.deepEqual(pRoGrAm.peek(), e)

    # it 'should parse "a"', ->
    #   // parse = parser.parse
    #   e = new Symbol("a")
    #   parser.parse("a", (a) ->
    #     assert.equal(a, e)

    it "should parse (a b c)", ->
      parser.parse "(a b c)", (pRoGrAm) ->
        assert.equal(pRoGrAm.toString(), "((a b c))")

    it "should parse (a 3 b 2 c 1)", ->
      parser.parse "(a 3 b 2 c 1)", (pRoGrAm) ->
        assert.equal(pRoGrAm.toString(),
          "((a 3 b 2 c 1))")

# ☕️ yoUtu.be/VdQKVDUBu2g
# 🌴 youtU.be/XMzATpob42A
