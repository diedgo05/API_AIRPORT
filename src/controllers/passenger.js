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
exports.getAllPassengers = (req, res) => {
  db.query('SELECT * FROM Passenger', (err, result) => {
    if (err) {
      res.status(500).send('Error');
    }
    res.json(result);
  });
};

exports.addPassenger = (req, res) => {
  let {first_name, last_name, age, nationality, phone_number, passport, email, id_reservation} = req.body;

  db.query('INSERT INTO Passenger (first_name, last_name, age, nationality, phone_number, passport, email, id_reservation) VALUES (?,?,?,?,?,?,?,?)', [first_name, last_name, age, nationality, phone_number, passport, email, id_reservation], (err, result) => {
    if(err) {
      res.status(500).send('Error');
    }
    res.json(result);
  })
};
