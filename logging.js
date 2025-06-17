async function logUser(user) {
  const appid = "78f28e0c-915a-4dfc-9e95-0c52106af653";
  const myHeaders = { "Content-Type": "application/json" };

   try {
    // Première requête GET pour récupérer les utilisateurs existants
    const response = await fetch(`https://getpantry.cloud/apiv1/pantry/${appid}/basket/flynum_users`, requestOptions);
    const existed_users = await response.json();

    if (user in existed_users) {
      const info = existed_users[user];
      const otp = info.otp;
      const hv_id = info.customer_id;

      // Si l'user est verifié
      if (otp === 200) {
        // S'il n'a pas été enregistré chez feda
        if (hv_id.length < 3) {
          const token = "sk_live_Ky3RjsxvCo33R4Ss7ATsXy_J";
          const url = "https://api.fedapay.com/v1/customers";

          // Création du client FedaPay
          const fedapayResponse = await fetch(url, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user })
          });
          const fedapayData = await fedapayResponse.json();
          const cust_id = fedapayData["v1/customer"]["id"];

          // Mise à jour des infos utilisateur
          const content = JSON.stringify({
            [user]: {
              "customer_id": cust_id,
            }
          });

          const updateOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: content,
            redirect: 'follow'
          };

          const updateResponse = await fetch(`https://getpantry.cloud/apiv1/pantry/${appid}/basket/flynum_users`, updateOptions);
          const updateResult = await updateResponse.json();

          if (user in updateResult) {
            return JSON.stringify({
              "success": "yes",
              "balance": 0
            });
          }
        } else {
          return JSON.stringify({
            "success": "yes",
            "balance": info.balance,
          });
        }
      } else {
        return JSON.stringify({
          "success": "yes",
          "otp": "",
          "balance": info.balance
        });
      }
    } else {
      // Création d'un nouvel utilisateur
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

      const createOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: content,
        redirect: 'follow'
      };

      const createResponse = await fetch(`https://getpantry.cloud/apiv1/pantry/${appid}/basket/flynum_users`, createOptions);
      const createResult = await createResponse.json();

      if (user in createResult) {
        return JSON.stringify({
          "success": "yes",
          "balance": 0,
          "otp": ""
        });
      }
    }
  } catch (error) {
    console.error('Error:', error);
   // throw error; // Propage l'erreur pour la gestion dans le code appelant
  }
}

module.exports = { logUser };