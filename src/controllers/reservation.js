const mysql = require('mysql2');
const bcrypt = require('bcrypt');
//Cargar las variables de entorno
require('dotenv').config();
// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    throw err;
  }
});

// Obtener todos los elementos
exports.getAllRes = (req, res) => {
  db.query('SELECT Reservation.idReservation,Reservation.date,Reservation.checklist,Reservation.cost,Reservation.idCustomer,Reservation.idFlight, Status.name AS status FROM Reservation JOIN Status ON Reservation.idStatus = Status.idStatus', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los elementos');
    }
    res.json(result);
  });
};

exports.addReservation = (req, res) => {
    const { date, checklist, cost, email, origin, destination } = req.body;
  
    if (!date || !checklist || !cost || !email || !origin || !destination) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = `
      SELECT Customer.idCustomer, Flight.idFlight 
      FROM Customer
      JOIN Flight ON Flight.origin = ? AND Flight.destination = ?
      WHERE Customer.email = ?
    `;
  
    db.query(query, [origin, destination, email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error', details: err });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'No matching customer or flight found' });
      }
  
      const { idCustomer, idFlight } = results[0];
  
      const reservationQuery = 'INSERT INTO Reservation (date, checklist, cost, idCustomer, idFlight, idStatus) VALUES (?, ?, ?, ?, ?, "1")';
  
      db.query(reservationQuery, [date, checklist, cost, idCustomer, idFlight], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to create reservation', details: err });
        }
  
        res.status(201).json({ message: 'Reservation created successfully', reservationId: result.insertId });
      });
    });
  };
  

exports.deleteReservation = (req,res) => {
    const {date}=req.body;
    db.query('DELETE FROM Reservation WHERE date = ?',[date], (err, result) => {
        if (err) {
          res.status(500).send('Error al eliminar');
        }
        res.json(result);
      });
};
