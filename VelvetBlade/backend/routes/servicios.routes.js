const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/servicios.controller');

router.get('/', serviciosController.listar);

module.exports = router;