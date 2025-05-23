
class Fn {
  constructor(bnd, args, body) {
    this.bnd = bnd;
    this.args = args;
    this.body = body;
  }

  call(bnd, args) {
    return invoke(this.bnd, this,
      args && args.map(function(a) {
        return evl(bnd, a)
      }))
  }

  toString() {
    return this.body.push(this.args)
      .push(new Symbol("fn"))
      .toString()
  }
}

module.exports = Fn;
