
function call(binding, fn, params) {
  switch (fn.constructor) {
    case Function:
      return fn.call(binding,
        ...params.mapEval(binding));
  }

  return fn.call(binding, params);
}

module.export = call;
