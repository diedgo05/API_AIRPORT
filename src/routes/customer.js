const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer');

// Rutas para los endpoints CRUD
router.get('/', CustomerController.getAllCustomer);
router.post('/add', CustomerController.addCustomer);

module.exports = router;



