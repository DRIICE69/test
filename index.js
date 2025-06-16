const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const user = req.query.user;
  const mail = req.query.mail;
  const amount = req.query.amount;

  //console.log(`User : ${user}`);
  //console.log(`Mail : ${mail}`);
  //console.log(`Amount : ${amount}`);

  res.send(`Transaction pour ${user} (${mail}) d'un montant de ${amount}`);
});

module.exports = app;