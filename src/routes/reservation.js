const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation');

// Rutas para los endpoints CRUD
router.get('/', ReservationController.getAllRes);
router.post('/add', ReservationController.addReservation);
router.delete('/delete', ReservationController.deleteReservation);
module.exports = router;



