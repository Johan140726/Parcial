const express = require('express');
const router = express.Router();
const profesionalesController = require('../controllers/profesionales.controller');

router.get('/', profesionalesController.listar);

module.exports = router;