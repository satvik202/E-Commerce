export function fetchAllProducts() {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('http://localhost:3000/products') 
      const data = await response.json()
      resolve({data})
    }
    );
  }


// export function fetchProductsByFilters(filter) {
//     // filter = {"category":"smartphone"}
//     // TODO : on server we will support multi values
//     // sort=price (asc)   sort=-price (descending)
//     let queryString = '';
//     for(let key in filter){
//       queryString += `${key}=${filter[key]}&`
//     }
  
//     return new Promise(async (resolve) =>{
//       //TODO: we will not hard-code server URL here
//       const response = await fetch('http://localhost:3000/products?'+queryString) 
//       const data = await response.json()
//       resolve({data})
//     }
//     );
// }


export function fetchProductsByFilters(filter,sort, pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page : 1, _per_page : 12}

  // TODO : on server we will support multi values in filter
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }


  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:3000/products?'+queryString) 
    const data = await response.json()
    const products = data.data;
    const totalItems = data.items;
    // const totalItems = await response.headers.get('X-Total-Count')
    // console.log(`this is totalItem ${totalItems}`)
    resolve({data: {products:products, totalItems:totalItems}})
  }
  );
}


export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/categories') 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:3000/brands') 
    const data = await response.json()
    resolve({data})
  }
  );
}


