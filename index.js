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
  }else{
return res.("ok")

  // Utilisation du logging
 
});

// N'oubliez pas d'exporter l'app pour Vercel
module.exports = app;