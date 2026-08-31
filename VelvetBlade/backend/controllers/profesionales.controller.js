const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'profesionales.json');

exports.listar = (req, res) => {
  const contenido = fs.readFileSync(DATA_PATH, 'utf-8');
  res.json(JSON.parse(contenido));
};