export function resolve(specifier, context, defaultResolve) {
  if (specifier.endsWith('.bubls')) {
    return {
      url: specifier,
      format: 'module',
    };
  }
  return defaultResolve(specifier, context, defaultResolve);
}

export function load(url, context, defaultLoad) {
  if (url.endsWith('.bubls')) {
    const code = "require('./src/bubblescript').loadFile('" + url + "');"
    return {
      format: 'module',
      source: code,
    };
  }
  return defaultLoad(url, context, defaultLoad);
}
