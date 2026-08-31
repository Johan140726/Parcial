const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', usuariosController.listar);
router.post('/', usuariosController.crear);
router.post('/login', usuariosController.login);

module.exports = router;