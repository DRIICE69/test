
const express = require('express');
//const logging = require('./logging');


const app = express();

const id = "78f28e0c-915a-4dfc-9e95-0c52106af653"
// Correction de la structure d'erreur
const errors = {
  user: "user required",
  mail: "invalid or malformed mail"
};

app.get('/user', (req, res) => {
  const user = req.query.user;
  if (!user) {
    // Correction de la réponse d'erreur
    return res.status(400).json({ error: errors.user });
  } else {
  

  }
});

// N'oubliez pas d'exporter l'app pour Vercel
module.exports = app;