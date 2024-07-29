const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const connection = require('./db.js');
const session = require('express-session');

app.use(express.json());

app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'sito')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

const checkAuth = (req, res) => {
    if (!req.session.userId) {
        res.status(401).json({ authenticated: false });
    } else {
        res.status(200).json({ authenticated: true });
    }
  };

app.get('/check-auth', checkAuth);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'sito', 'index.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    connection.query(
      'SELECT ID_utente FROM utenti WHERE email = ? AND password_utente = ?',
      [email, password],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Errore durante il login' });
        } else {
          if (!results.length) {
            res.status(401).json({ error: 'Email o password errati' });
          } else {
            req.session.userId = results[0].ID_utente;
            res.status(200).json({ message: 'Login avvenuto con successo' });
          }
        }
      }
    );
  });
  
app.post('/registrazione', (req, res) => {
  const { nome, cognome, email, password_utente, nome_utente } = req.body;

  connection.query(
      'SELECT COUNT(*) AS email_count FROM utenti WHERE email = ?',
      [email],
      (error, results) => {
          if (error) {
              return res.status(500).json({ error: 'Errore durante il controllo dell\'email' });
          }
          const emailCount = results[0].email_count;
          if (emailCount > 0) {
              return res.status(400).json({ error: 'Questa email è già stata utilizzata' });
          }

          connection.query(
              'SELECT COUNT(*) AS username_count FROM utenti WHERE nome_utente = ?',
              [nome_utente],
              (error, results) => {
                  if (error) {
                      return res.status(500).json({ error: 'Errore durante il controllo del nome utente' });
                  }
                  const usernameCount = results[0].username_count;
                  if (usernameCount > 0) {
                      return res.status(401).json({ error: 'Questo nome utente è già stato utilizzato' });
                  }

                  connection.query(
                      'INSERT INTO utenti (nome, cognome, nome_utente, email, password_utente) VALUES (?, ?, ?, ?, ?)',
                      [nome, cognome, nome_utente, email, password_utente],
                      (error, results) => {
                          if (error) {
                              return res.status(500).json({ error: 'Errore durante la registrazione' });
                          }
                          connection.query(
                              'SELECT ID_utente FROM utenti WHERE email = ?',
                              [email],
                              (error, results) => {
                                  if (error) {
                                      return res.status(500).json({ error: 'Errore durante la registrazione' });
                                  }
                                  const userId = results[0].ID_utente;
                                  req.session.userId = userId;
                                  res.status(200).json({ message: 'Registrazione avvenuta con successo' });
                              }
                          );
                      }
                  );
              }
          );
      }
  );
});


app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});