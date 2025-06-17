async function logUser(user) {
  const appid = "78f28e0c-915a-4dfc-9e95-0c52106af653";
  const myHeaders = { "Content-Type": "application/json" };

  try {
    // Première requête GET pour récupérer les utilisateurs existants
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch(`https://getpantry.cloud/apiv1/pantry/${appid}/basket/flynum_users`, requestOptions);
    const existed_users = await response.json();

    if (user in existed_users) {
      // Si l'utilisateur existe déjà
      const info = existed_users[user]; // Correction: existed_users.user -> existed_users[user]
      const reply = JSON.stringify({
        "balance": info.balance
      });
      return reply;
    } else {
      // Si l'utilisateur n'existe pas, on le crée
      const content = JSON.stringify({
        [user]: {
          "otp": 1234,
          "balance": 0,
          "hv_num": 0,
          "name": "",
          "last_name": "",
          "number": "",
          "customer_id": "",
          "last_connexion": "",
        }
      });

      const Options = {
        method: 'PUT',
        headers: myHeaders,
        body: content,
        redirect: 'follow'
      };

      const createResponse = await fetch(`https://getpantry.cloud/apiv1/pantry/${appid}/basket/flynum_users`, Options);
      const result = await createResponse.json();

      if (user in result) {
        const reply = JSON.stringify({
          "success": "yes",
          "balance": 0,
          "otp": ""
        });
        return reply;
      }
    }
  } catch (error) {
    console.log('error', error);
 
  }
}

module.exports = { logUser };