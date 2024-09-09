const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passenger');

// Rutas para los endpoints CRUD
router.get('/', passengerController.getAllPassengers);
router.post('/add', passengerController.addPassenger);
module.exports = router;