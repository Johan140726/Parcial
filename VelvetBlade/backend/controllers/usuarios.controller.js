const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'usuarios.json');

function leerUsuarios() {
  const contenido = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(contenido);
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(usuarios, null, 2));
}

exports.listar = (req, res) => {
  const usuarios = leerUsuarios().map(({ password, ...resto }) => resto);
  res.json(usuarios);
};

exports.crear = (req, res) => {
  const { nombre, telefono, correo, password, tipo } = req.body;

  if (!nombre || !telefono || !correo || !password || !tipo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const usuarios = leerUsuarios();

  const existe = usuarios.some((u) => u.correo === correo);
  if (existe) {
    return res.status(409).json({ error: 'El correo ya está registrado' });
  }

  const nuevoUsuario = {
    id: 'u' + (usuarios.length + 1) + '_' + Date.now(),
    nombre,
    telefono,
    correo,
    password,
    tipo,
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  const { password: _omit, ...usuarioSinPassword } = nuevoUsuario;
  res.status(201).json(usuarioSinPassword);
};

exports.login = (req, res) => {
  const { correo, password } = req.body;
  const usuarios = leerUsuarios();

  const usuario = usuarios.find((u) => u.correo === correo && u.password === password);

  if (!usuario) {
    return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
  }

  const { password: _omit, ...usuarioSinPassword } = usuario;
  res.json(usuarioSinPassword);
};