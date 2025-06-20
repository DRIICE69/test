const appid = "78f28e0c-915a-4dfc-9e95-0c52106af653";

async function check(user, code) {
    const myHeaders = { "Content-Type": "application/json" };
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`https://getpantry.cloud/apiv1/pantry/${appid}/basket/flynum_users`, requestOptions);
        const existed_users = await response.json();

        if (user in existed_users) {
            const info = existed_users[user];
            const otp = info.otp;

            if (otp === code) {
                // Mise à jour des infos utilisateur
                const content = JSON.stringify({
                    [user]: {
                        "otp": 200 
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
                    return JSON.stringify( {
otpStatus:"valid",
                        mail: user,
                        success: "yes",
                        balance: info.balance || 0
                    });
                }
            }
        }

        // Si on arrive ici, c'est que soit l'utilisateur n'existe pas, soit le code est incorrect
        return JSON.stringify( {
            mail: user,
            success: "no",
            balance: 0,
            otp: ""
        });

    } catch (error) {
        console.error('Error:', error);
        return JSON.stringify({
            mail: user,
            success: "no",
            error: "Erreur serveur",
            balance: 0,
            otp: ""
        });
    }
}