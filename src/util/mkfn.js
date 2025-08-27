const CoreFunction = require("../core_function");

// Makes a Bubblescript function from a
// Javascript function.
// Params:
//   q: A Javascript function that will be
//   called for this function.
// Returns an annonomous function that is
// sutible for use with Bubblescript.
// #coreUtilityFunction
// TODO: Create tests for mkfn.
// function mkfn(q) {
//   return function (params) {
//     // Handel & expansion.
//     // let splits = params.split(sAmp);
//     // console.log("hi", splits);
//     // if (splits.count() > 1) {
//     //   params = splits.first.conj(splits.rest.head);
//     //   console.log(params);
//     // }

//     return q.call(this, params.mapEval(this));
//   }
// }
function mkfn(q) {
  return new CoreFunction(function (params) {
    // console.log("params", params);
    return q.call(this, params.mapEval(this));
  });
}

module.exports = mkfn;
