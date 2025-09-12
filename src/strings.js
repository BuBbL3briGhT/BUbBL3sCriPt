function interpolar(plantilla, valores) {
  return plantilla.replace(/\${(.*?)}/g,
    (_, llave) => valores[llave.trim()] || '');
}

module.export = { interpolar };
