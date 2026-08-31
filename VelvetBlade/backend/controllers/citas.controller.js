const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'citas.json');

function leerCitas() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

exports.listar = (req, res) => {
  res.json(leerCitas());
};

exports.listarPorUsuario = (req, res) => {
  const { usuarioId } = req.params;
  const citas = leerCitas().filter((c) => c.usuarioId === usuarioId);
  res.json(citas);
};