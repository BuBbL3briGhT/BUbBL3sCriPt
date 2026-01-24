export function interpolate(values) {
  const template = this;
  return template.replace(/\${(.*?)}/g,
    (_, key) => values[key.trim()] || '');
}
