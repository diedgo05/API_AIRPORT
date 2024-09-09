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

// exports.payReservation = (req, res) => {
//   let {method, date, digits,idReservation} = req.body;

//   db.query('INSERT INTO Payment (method, date, digits,idReserve) VALUES (?,?,?,?)', [method, date, digits,idReservation], (err, result) => {
//     if(err) {
//       res.status(500).send('Error');
//     }
//     res.json(result);
//   })
// };

exports.payReservation = (req, res) => {
    const { method, date, digits, idReservation } = req.body;

    db.query("INSERT INTO Payment (method, date, digits, idReserve) VALUES (?, ?, ?, ?)", [method, date, digits, idReservation], (err, result) => {
      if (err) {
        res.status(500).send('Error inserting payment');
      }  
      db.query(` UPDATE Reservation SET idStatus = 2 WHERE idReservation = ?`,[idReservation], (err) => {
        if (err) {
            res.status(500).send('Error updating status');
        }
        res.status(200).json({ message: 'Payment recorded and reservation status updated successfully' });
      });
    });
  };
  