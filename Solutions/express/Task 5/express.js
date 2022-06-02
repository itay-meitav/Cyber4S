const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

app.get('/add', (req, res) => {
  res.json(Number(req.query.p1) + Number(req.query.p2));
});

app.get('/subtract', (req, res) => {
  res.json(Number(req.query.p1) - Number(req.query.p2));
})

app.get('/multiply', (req, res) => {
  res.json(Number(req.query.p1) * Number(req.query.p2));
})

app.get('/divide', (req, res) => {
  res.json(Number(req.query.p1) / Number(req.query.p2));
})

app.listen(4000);
