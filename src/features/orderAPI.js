export const createOrder = async (order)=> {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:3000/orders", {
            method : 'POST',
            body : JSON.stringify(order),
            headers : {'content-type':'application/json'}
        })
        const data = await response.json();
        resolve({ data });
    })
}
export const updateOrder = async (order)=> {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:3000/orders/"+order.id, {
            method : 'PATCH',
            body : JSON.stringify(order),
            headers : {'content-type':'application/json'}
        })
        const data = await response.json();
        resolve({ data });
    })
}
export const fetchAllOrders = async (sort,pagination)=> {
    let queryString=""
    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
      }
    
    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`;
      }
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:3000/orders&"+queryString)
        const data = await response.json();
        // console.log(data);
        const totalOrders = response.headers.get('X-Total-Count')
        resolve({ data : {orders : data, totalOrders : +totalOrders} });
    })

}