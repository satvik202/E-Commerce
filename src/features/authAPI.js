export const createUser = async (userData)=> {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:3000/users", {
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
        const email = loginInfo.email;
        const password = loginInfo.password;
        const response = await fetch("http://localhost:3000/users?email="+email)
        
        const data = await response.json()
        console.log({data});
        
        if(data.length){
            // console.log(data[0].email);
            // console.log(data[0].password);

            if(data[0].password === password) resolve({data : data[0]})
            else reject({message : "wrong credentials"})
        }else{
            reject({message : "user not found"})
        }

    })
}

export function updateUser(update) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/users/'+update.id, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }