function logUser(user) {
const appid = "78f28e0c-915a-4dfc-9e95-0c52106af653"  
  var myHeaders ={"Content-Type": "application/json"};

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
 // body: raw,
  redirect: 'follow'
};

fetch("https://getpantry.cloud/apiv1/pantry/"+appid+"/basket/flynum_users", requestOptions)
  .then(response => response.json())
  .then(result => {
  let existed_users = result;
 
 if(user in existed_users){
 let info = existed_users.user
 
 let reply = JSON.stringify({
 "blance":info.balance,
 })
 //console.log(reply)
 res.send(reply)
 
 }else{
 

 
 var content = JSON.stringify({
 [user]:{
 "otp":1234,
 "balance": 0,
 "hv_num": 0,
 "name":"",
 "last_name":"",
 "number":"",
 "customer_id":"",
 "last_connexion":"",
 }
 
 });
 
 var Options = {
 method: 'PUT',
 headers: myHeaders,
 body: content,
 redirect: 'follow'
 };
 
 fetch("https://getpantry.cloud/apiv1/pantry/"+appid+"/basket/flynum_users", Options)
 .then(response => response.json())
 .then(result =>{
  if(user in result){
 
 let reply = JSON.stringify({
 "success":"yes","balance":0,"otp":""})
 res.send(reply)
 //console.log(result.user)
 }
 }
 )
 .catch(error => console.log('error', error));
 
 
 }
  

}
  
  )
  .catch(error => console.log('error', error));

}

module.exports = { logUser };