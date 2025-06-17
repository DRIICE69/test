const appid = "78f28e0c-915a-4dfc-9e95-0c52106af653";

async function listNum(user) {
    const myHeaders = { "Content-Type": "application/json" };
    
    try {
        // 1. Vérifier si l'utilisateur existe dans flynum_users
        const userResponse = await fetch(
            `https://getpantry.cloud/apiv1/pantry/${appid}/basket/flynum_users`, 
            {
                method: 'GET',
                headers: myHeaders
            }
        );
        
        const usersData = await userResponse.json();
        
        if (!(user in usersData)) {
            return JSON.stringify({
                success: "no",
               balance:0,
                mail: user
            });
        }

        // 2. Vérifier si l'utilisateur a des numéros dans flynum_user_num
        const numbersResponse = await fetch(
            `https://getpantry.cloud/apiv1/pantry/${appid}/basket/flynum_user_num`, 
            {
                method: 'GET',
                headers: myHeaders
            }
        );
        
        let reply = [{"hv_num":"no"}]
        const numbersData = await numbersResponse.json();
        
        // 3. Retourner les données si elles existent
        if (user in numbersData) {
           reply = [{"hv_num":"yes"},{numbers:numbersData[user]}]
        //  reply.append( numbers: numbersData[user])
            return reply;
       
        } else {
        
            return reply//JSON.stringify({
                
               //reply
                
          //  });
        }
        
    } catch (error) {
        console.error("Erreur dans listNum:", error);
        return {
            success: "yes",
           // user: user,
            message: "Erreur serveur",
            //error: error.message
        };
    }
}
module.exports = { listNum };