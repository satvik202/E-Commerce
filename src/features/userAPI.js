export const fetchLoggedInUserOrders = async (userId)=>{

    return new Promise(async (resolve)=>{
        const response = await fetch("http://localhost:3000/orders?user.id="+userId)
        const data = await response.json()
        resolve({data})
    })
}
export const fetchLoggedInUser = async (userId)=>{

    return new Promise(async (resolve)=>{
        const response = await fetch("http://localhost:3000/users/"+userId)
        const data = await response.json()
        resolve({data})
    })
}

export const updateUser = async (update)=> {
    return new Promise(async (resolve) => {
        // console.log(update, "inside updateUser")
        const response = await fetch("http://localhost:3000/users/"+update.id, {
            method : 'PATCH',
            body : JSON.stringify(update),
            headers : {'content-type':'application/json'}
        })
        const data = await response.json();
        resolve({ data });
    })
}

