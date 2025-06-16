const JsonDB = require('litejsondb');

// Initialize a basic database
const db = new JsonDB("flynum.json");

const express = require('express');
const app = express();
let error = {"err":{"user":"user required","mail":"unvaild or malformed mail"},};
app.get('/user', (req, res) => {
  const user = req.query.user;
if(!user){
res.send(JSON.stringify(error.err.mail))
return;
}else{

const logging = require('./logging');

let ans = logging.logUser(user)
res.send(ans)
}
 
});
//app.listen(3000);

module.exports = app;