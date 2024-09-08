export const createOrder = async (order)=> {
    // console.log(order, "order")
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
export const fetchAllOrders = async (sort, pagination)=> {
    let queryString=""
    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
      }
    
    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`;
      }
    //   console.log(queryString, "inside fetchAllOrders")
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:3000/orders?"+queryString)
        const data = await response.json();
        const totalOrders = data.items;
        const orders = data.data;
        resolve({ data : {orders : orders, totalOrders : +totalOrders} });
    })

}