
class Macro {
  constructor(bnd, args, body) {
    this.bnd = bnd;
    this.args = args;
    this.body = body;
  }

  call(bnd, args) {
    return evl(this.bnd, invoke(bnd, this, args));
  }

  expand(bnd, args) {
    return invoke(bnd, this, args);
  }
}

module.exports = Macro;
