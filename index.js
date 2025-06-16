const JsonDB = require('litejsondb');
const express = require('express');
const logging = require('./logging'); // Déplacer l'import en haut

// Initialize database
const db = new JsonDB("flynum.json");

const app = express();

// Correction de la structure d'erreur
const errors = {
  user: "user required",
  mail: "invalid or malformed mail"
};

app.get('/user', (req, res) => {
  const user = req.query.user;
  
  if(!user) {
    // Correction de la réponse d'erreur
    return res.status(400).json({ 
      error: {
        message: errors.user,
        details: errors.mail
      }
    });
  }

  // Utilisation du logging
  try {
    const ans = logging.logUser(user);
    res.json(ans);
  } catch (err) {
    console.error("Logging error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// N'oubliez pas d'exporter l'app pour Vercel
module.exports = app;