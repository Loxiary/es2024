const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')
const os = require("os")
const axios = require('axios');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/template/html/scrolling.html'));
});

app.get('/content', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/template/html/index.html'));
});

app.get('/sources', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/template/html/sources.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/template/html/about.html'));
});

app.get('/api/quiz', (req, res) => {
    const filePath = path.join(__dirname, '/public/template/json/quiz.json'); // Chemin vers le fichier JSON

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }

        try {
            const quizData = JSON.parse(data); // Conversion du JSON en objet
            res.json(quizData);
        } catch (parseError) {
            console.error('Erreur lors de l\'analyse du JSON :', parseError);
            res.status(500).json({ error: 'Erreur de format JSON' });
        }
    });
});

app.post('/api/log', (req, res) => {
    const { question, userAnswer, correctAnswer, isMistake, score } = req.body;

    if (!question || !userAnswer || !correctAnswer || isMistake === undefined || score === undefined) {
        return res.status(400).json({ error: 'Données invalides' });
    }

    // Récupérer l'IP publique du client
    let clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    // Si l'IP est "::1" ou "127.0.0.1", c'est du localhost
    if (clientIP === '::1' || clientIP === '127.0.0.1') {
        clientIP = 'localhost';
    }

    // Nettoyer l'IP pour un nom de fichier valide
    clientIP = clientIP.split(',')[0].trim().replace(/[:.]/g, '_');

    const logFilePath = path.join(__dirname, `logs/${clientIP}.txt`);

    // Assurer l'existence du dossier logs
    if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
    }

    // Format du log
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0]; // Format lisible
    const logEntry = `[LOG] [${timestamp}] - : ${question} | ${userAnswer} | ${correctAnswer} | ${isMistake} | ${score}\n`;

    // Ajouter le log à la fin du fichier
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Erreur lors de l’écriture du log:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json({ success: true, message: `Log enregistré avec succès dans ${clientIP}.txt` });
    });
});

app.post('/update-username', (req, res) => {
  const username = os.userInfo().username;

  if (username) {
      res.json({ success: true, username: username });    
  } else {
      res.status(400).json({ success: false, message: 'Username not found.' });
  }
})

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});