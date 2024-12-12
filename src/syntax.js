
class Syntax {};
class LParen extends Syntax {};
class LBrack extends Syntax {};
class SingleQ extends Syntax {};
class Dot extends Syntax {};
class Slash extends Syntax {};
class Space extends Syntax {};

LParen.toString = function() {
  return "(";
}
LBrack.toString = function() {
  return "[";
}
Dot.toString = function() {
  return ".";
}
