import axios from "axios";

export const limit = 20

export async function getCategories(){

    return await await axios.get("https://api.escuelajs.co/api/v1/categories").then(res => res.data)

}



export async function getItemsbyOffset(categoryId , offset){
   return categoryId > 0 ? await await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products?offset=${offset}&limit=${limit}`).then(res => res.data) :
     await await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`).then(res => res.data)
}


export async function getItemsByCategory(categoryId){
    return categoryId > 0 ? await await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products?offset=0&limit=${limit}`).then(res => res.data) :
    await await axios.get(`https://api.escuelajs.co/api/v1/products?offset=0&limit=${limit}`).then(res => res.data)
}

export async function getTotalCategoryItems(categoryId){
    return categoryId > 0 ? await await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`).then(res => res.data) :
    await await axios.get(`https://api.escuelajs.co/api/v1/products`).then(res => res.data)
}