const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/template/html/disclaimer.html'));
  });

  app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
  });