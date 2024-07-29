var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: 'astroview'
});

connection.connect((err) => {
  if (err) {
    console.error('Errore', err);
    return;
  }
  console.log('Database connesso');
});

module.exports = connection;