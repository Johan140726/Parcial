const express = require('express');
const cors = require('cors');

const usuariosRoutes = require('./routes/usuarios.routes');
const serviciosRoutes = require('./routes/servicios.routes');
const profesionalesRoutes = require('./routes/profesionales.routes');
const citasRoutes = require('./routes/citas.routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/profesionales', profesionalesRoutes);
app.use('/api', citasRoutes); // expone /api/citas y /api/citas/:id, /api/citas/:usuarioId

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Velvet & Blade funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor Velvet & Blade escuchando en http://localhost:${PORT}`);
});