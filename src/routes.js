const { Router } = require('express');

const app = new Router();

app.get('/', (req, res) => {
  res.json({ ok: true });
});


module.exports = app;
