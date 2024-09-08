export const addToCart = async (item)=> {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:3000/cart", {
            method : 'POST',
            body : JSON.stringify(item),
            headers : {'content-type':'application/json'}
        })
        const data = await response.json();
        resolve({ data });
    })
}

export const updateCart = async (update)=> {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:3000/cart/"+update.id, {
            method : 'PATCH',
            body : JSON.stringify(update),
            headers : {'content-type':'application/json'}
        })
        const data = await response.json();
        // console.log(response, "in cartAPI")
        resolve({ data });
    })
}
export const deleteItemFromCart = async (itemId)=> {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:3000/cart/"+itemId, {
            method : 'DELETE',
            headers : {'content-type':'application/json'}
        })
        // const data = await response.json();
        resolve({ data : {id:itemId} });
    })
}



export const fetchCartByUserId = async (id)=> {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:3000/cart?user="+id)
        const data = await response.json();
        resolve({ data });
    })
}

export const resetCart = async (userId)=> {
    // fetchCartByUserId and then deleteItemFromCart
    return new Promise(async (resolve) => {
        const response = await fetchCartByUserId(userId)
        const items = response.data
        // console.log(items)
        for(let item of items){
             await deleteItemFromCart(item.id)
        }
        resolve( {status : "success"});
    })
}




