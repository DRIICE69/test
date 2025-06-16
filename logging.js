const JsonDB = require('litejsondb');

// Initialize with a specific filename
const db  = new JsonDB('flynum.json')

function logUser(user){
let r = db.searchData(db.showDb(), user);
let number = Object.keys(r).length

if(number > 0){
let key = Object.keys(r)[0]
let route = key.replace("/name","")
let age = db.getData(route)

return age
}else{
let allData = db.getData("users");
let available = Object.keys(allData).length;
let this_user_id = available + 1
let this_user = "users/"+this_user_id;
db.setData(this_user, { name: user, age: 20 });

let done = db.getData(this_user)
return done;
}
}
module.exports = {logUser}
