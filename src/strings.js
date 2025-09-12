function interpolate(template, values) {
  return template.replace(/\${(.*?)}/g,
    (_, key) => values[key.trim()] || '');
}

module.export = { interpolate };
