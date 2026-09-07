const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citas.controller');

router.get('/citas', citasController.listar);
router.get('/citas/:usuarioId', citasController.listarPorUsuario);
router.post('/citas', citasController.crear);
router.patch('/citas/:id/estado', citasController.actualizarEstado);

module.exports = router;
