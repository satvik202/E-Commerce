export const createUser = async (userData)=> {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:3000/auth/signup", {
            method : 'POST',
            body : JSON.stringify(userData),
            headers : {'content-type':'application/json'}
        })
        const data = await response.json();
        resolve({ data });
    })
}



export const checkUser = async (loginInfo)=> {
    return new Promise(async (resolve, reject) => {

        try{
            const response = await fetch("http://localhost:3000/auth/login", {
                method : 'POST',
                body : JSON.stringify(loginInfo),
                headers : {'content-type':'application/json'}
            })
            
            if(response.ok){
                const data = await response.json()
                resolve({data});
            }else{
                reject({message : "invalid credentials"})
            }

        }catch(err){
            reject({err})   
        }
    })
}


export const signOut = async (userId)=> {
    return new Promise(async (resolve) => {
       // TODO : On server we will remove user session
        resolve({ data: "success" });
    })
}

