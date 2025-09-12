function interpolar(valores) {
  const plantilla = this;
  return plantilla.replace(/\${(.*?)}/g,
    (_, llave) => valores[llave.trim()] || '');
}

module.export = { interpolar };
