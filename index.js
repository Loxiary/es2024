const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')
const os = require("os")

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