const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'citas.json');

function leerCitas() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function guardarCitas(citas) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(citas, null, 2));
}

exports.listar = (req, res) => {
  res.json(leerCitas());
};

exports.listarPorUsuario = (req, res) => {
  const { usuarioId } = req.params;
  const citas = leerCitas().filter((c) => c.usuarioId === usuarioId);
  res.json(citas);
};

exports.crear = (req, res) => {
  const { usuarioId, servicioId, profesionalId, fecha, hora } = req.body;

  if (!usuarioId || !servicioId || !profesionalId || !fecha || !hora) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const citas = leerCitas();

  const horarioOcupado = citas.some(
    (c) =>
      c.profesionalId === profesionalId &&
      c.fecha === fecha &&
      c.hora === hora &&
      c.estado !== 'cancelado'
  );

  if (horarioOcupado) {
    return res.status(409).json({ error: 'Ese horario ya fue reservado. Elige otro.' });
  }

  const nuevaCita = {
    id: 'c' + (citas.length + 1) + '_' + Date.now(),
    usuarioId,
    servicioId,
    profesionalId,
    fecha,
    hora,
    estado: 'confirmado',
  };

  citas.push(nuevaCita);
  guardarCitas(citas);

  res.status(201).json(nuevaCita);
};

exports.actualizarEstado = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ['confirmado', 'cancelado', 'completado'];
  if (!estado || !estadosValidos.includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  const citas = leerCitas();
  const index = citas.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Cita no encontrada' });
  }

  citas[index].estado = estado;
  guardarCitas(citas);

  res.json(citas[index]);
};