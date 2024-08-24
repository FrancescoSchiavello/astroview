var mysql = require('mysql2');
var connection

if (process.env.JAWSDB_URL) {

  const dbUrl = process.env.JAWSDB_URL;
  const dbConfig = new URL(dbUrl);
  connection = mysql.createConnection({
      host: dbConfig.hostname,
      user: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.pathname.split("/")[1]
  });
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: 'astroview'
  });
}

connection.connect((err) => {
  if (err) {
    console.error('Errore', err);
    return;
  }
  console.log('Database connesso');
});

module.exports = connection;