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
      'SELECT id_utente FROM utenti WHERE email = ? AND password_utente = ?',
      [email, password],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Errore durante il login' });
        } else {
          if (!results.length) {
            res.status(401).json({ error: 'Email o password errati' });
          } else {
            req.session.userId = results[0].id_utente;
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
                              'SELECT id_utente FROM utenti WHERE email = ?',
                              [email],
                              (error, results) => {
                                  if (error) {
                                      return res.status(500).json({ error: 'Errore durante la registrazione' });
                                  }
                                  const userId = results[0].id_utente;
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

app.get('/user-info', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Non autenticato' });
    }

    const userId = req.session.userId;

    connection.query(
        'SELECT nome_utente, punti_max FROM utenti WHERE id_utente = ?',
        [userId],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Errore durante il recupero delle informazioni utente' });
            }
            if (!results.length) {
                return res.status(404).json({ error: 'Utente non trovato' });
            }

            const userInfo = results[0];
            res.status(200).json({ nome_utente: userInfo.nome_utente, punti_max: userInfo.punti_max });
        }
    );
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Errore durante il logout' });
        }
        res.status(200).json({ message: 'Logout avvenuto con successo' });
    });
});

app.get('/classifica', (req, res) => {
    connection.query('SELECT id_utente, nome_utente, punti_max FROM utenti ORDER BY punti_max DESC', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/current-user', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Non autenticato' });
    }
    res.json({ userId: req.session.userId });
});

let lastQuestions = []; // Memorizza le ultime 10 domande

app.get('/random-question', (req, res) => {
    // Costruisci una lista di ID delle domande da escludere
    const excludeIds = lastQuestions.length ? lastQuestions.map(q => q.id_domanda) : [-1]; // [-1] se la lista è vuota

    connection.query(
        'SELECT * FROM domande WHERE id_domanda NOT IN (?) ORDER BY RAND() LIMIT 1',
        [excludeIds],
        (error, questionResults) => {
            if (error) {
                return res.status(500).json({ error: 'Errore durante il recupero della domanda' });
            }
            if (!questionResults.length) {
                return res.status(404).json({ error: 'Nessuna domanda trovata' });
            }

            const question = questionResults[0];

            // Aggiungi la domanda estratta alla lista delle ultime domande
            lastQuestions.push(question);
            if (lastQuestions.length > 10) {
                lastQuestions.shift(); // Rimuovi la più vecchia se la lista supera le 10 domande
            }

            connection.query(
                'SELECT * FROM risposte WHERE id_domanda = ?',
                [question.id_domanda],
                (error, answerResults) => {
                    if (error) {
                        return res.status(500).json({ error: 'Errore durante il recupero delle risposte' });
                    }
                    res.status(200).json({
                        domanda: question,
                        risposte: answerResults
                    });
                }
            );
        }
    );
});


app.post('/update-score', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Non autenticato' });
    }

    const userId = req.session.userId;
    const { punti } = req.body;

    connection.query(
        'SELECT punti_max FROM utenti WHERE id_utente = ?',
        [userId],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Errore durante il recupero delle informazioni utente' });
            }
            if (!results.length) {
                return res.status(404).json({ error: 'Utente non trovato' });
            }

            const puntiMaxAttuali = results[0].punti_max;

            if (punti > puntiMaxAttuali) {
                connection.query(
                    'UPDATE utenti SET punti_max = ? WHERE id_utente = ?',
                    [punti, userId],
                    (error) => {
                        if (error) {
                            return res.status(500).json({ error: 'Errore durante l\'aggiornamento del punteggio' });
                        }
                        res.status(200).json({ message: 'Punteggio aggiornato con successo' });
                    }
                );
            } else {
                res.status(200).json({ message: 'Il punteggio non è superiore al punteggio massimo attuale' });
            }
        }
    );
});


app.listen(process.env.port || port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});