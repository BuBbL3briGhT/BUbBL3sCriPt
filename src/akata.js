
const Bubble = require("./bubble");
const Balloon = require("./balloon");
const Keyword = require("./keyword");
const Symbol = require("./symbol");
const Quoted = require("./quoted");
const Errors = require("./errors");
const tokenize = require("./tokenize");

const { TOKEN_STRiNG, TOKEN_NUMBER, TOKEN_SYMBOL, TOKEN_KEYWORD } = tokenize;

const { peek, pop, push, invert } = Bubble;

function parse (



