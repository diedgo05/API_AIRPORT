const express = require('express');
const bodyParser = require('body-parser');
const CustomerRoutes = require('./routes/customer');
const FlightRoutes = require('./routes/flight');
const ReservationRoutes = require('./routes/reservation');
const PassengerRoutes = require('./routes/passenger');
const PaymentRoutes = require('./routes/payment');

require('dotenv').config();
const app = express();
const port = process.env.DB_PORT || 3000;

// Middleware para analizar los cuerpos de las solicitudes
app.use(bodyParser.json());

// Usar las rutas de los items
app.use('/customer', CustomerRoutes);
app.use('/flight', FlightRoutes);
app.use('/reservation', ReservationRoutes);
app.use('/passenger',PassengerRoutes);
app.use('/payment', PaymentRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
