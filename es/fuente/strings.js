función interpolate(values) {
  constante template = esta;
  vuelta template.replace(/\${(.*?)}/g,
    (_, key) => values[key.trim()] || '');
}

módulo.exportaciones = { interpolate };
