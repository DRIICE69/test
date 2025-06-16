const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("Yo c'est DRIICE, tu captes où pas ?? 🤨 !" );
});

module.exports = app;