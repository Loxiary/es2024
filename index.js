const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path')
const os = require("os")

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const PORT = 3000;

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