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
exports.getAllCustomer = (req, res) => {
  db.query('SELECT * FROM Customer', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los elementos');
    }
    res.json(result);
  });
};

exports.addCustomer = (req, res) => {
  let {first_name, last_name, email, phone_number} = req.body;

  db.query('INSERT INTO Customer (first_name, last_name, email, phone_number) VALUES (?,?,?,?)', [first_name, last_name, email, phone_number], (err, result) => {
    if(err) {
      res.status(500).send('Error');
    }
    res.json(result);
  })
};
