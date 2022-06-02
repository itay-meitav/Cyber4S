const express = require('express');

const app = express();

app.use(express.static(__dirname + '/src'), (req, res, next) => {
  next();
});

// GET
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});
app.get('/site', (req, res) => {
  res.redirect('https://www.avatar.com');
});
app.get('/wiki', (req, res) => {
  res.redirect('https://en.wikipedia.org/wiki/Avatar_(2009_film)');
});
app.get('/pictures', (req, res) => {
  res.sendFile(__dirname + '/src/pictures.html');
});
app.get('*', (req, res) => { // Page not found
  console.log(req.url);
  res.sendFile(__dirname + '/src/404.html');
});

app.listen(4000);
