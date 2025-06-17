
const errors = {
  user: "user required",
  mail: "invalid or malformed mail"
};

//AUTH

app.get('/user', (req, res) => {
  const user = req.query.user;
  if (!user) {
    return res.status(400).json({ error: errors.user });
  } else {
    // Authentification avec gestion de la promesse
    logging.logUser(user)
      .then((response) => {
        res.send(response)
      })
      .catch(error => {
        console.error('Error in logUser:', error);
        res.status(500).json({ error: "Internal server error" });
      });
  }
});

////OTP

app.get('/otp', (req, res) => {
  const user = req.query.user;
const code = req.query.otp
  if (!user || !code) {
    return res.status(400).json({ error: errors.user });
  } else {
    // Authentification avec gestion de la promesse
    checkOtp.check(user, code)
      .then((response) => {
        res.send(response)
      })
      .catch(error => {
        console.error('Error in check:', error);
        res.status(500).json({ error: "Internal server error" });
      });
  }
});


app.get('/list_num', (req, res) => {
  const user = req.query.user;
//const code = req.query.otp
  if (!user) {
    return res.status(400).json({ error: errors.user });
  } else {
    // Authentification avec gestion de la promesse
    GetNum.listNum(user)
      .then((response) => {
        res.send(response)
      })
      .catch(error => {
        console.error('Error in check:', error);
        res.status(500).json({ error: "Internal server error" });
      });
  }
});



module.exports = app;