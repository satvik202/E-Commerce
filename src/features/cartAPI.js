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
        resolve({ data });
    })
}
export const deleteItemFromCart = async (itemId)=> {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:3000/cart/"+itemId, {
            method : 'DELETE',
            headers : {'content-type':'application/json'}
        })
        const data = await response.json();
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