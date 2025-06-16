const JsonDB = require('litejsondb');

// Initialisation de la DB (une seule fois)
const db = new JsonDB('flynum.json');

// Fonction helper pour éviter les répétitions
function getUserPath(userId) {
  return `users/${userId}`;
}

function logUser(user) {
  try {
    // Vérification initiale
    if (!user || typeof user !== 'string') {
      throw new Error('Invalid user parameter');
    }

    // 1. Vérifier si l'utilisateur existe déjà
    const allUsers = db.getData("users") || {};
    const existingUserEntry = Object.entries(allUsers).find(
      ([_, userData]) => userData.name === user
    );

    if (existingUserEntry) {
      const [userId, userData] = existingUserEntry;
      return userData;
    }

    // 2. Créer un nouvel utilisateur si non trouvé
    const newUserId = Object.keys(allUsers).length + 1;
    const newUserPath = getUserPath(newUserId);
    const newUserData = { name: user, age: 20 };

    db.setData(newUserPath, newUserData);
    
    // Rafraîchir les données après écriture
    return db.getData(newUserPath);
    
  } catch (error) {
    console.error('Error in logUser:', error);
    throw error; // À gérer dans le routeur
  }
}

module.exports = { logUser };