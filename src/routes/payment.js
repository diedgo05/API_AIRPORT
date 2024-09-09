const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/payment');

// Rutas para los endpoints CRUD
router.post('/pay', PaymentController.payReservation);
module.exports = router;



