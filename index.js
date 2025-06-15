const express = require('express');
const app = express();

app.use((req, res) => {
  res.send('DRIICE');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});