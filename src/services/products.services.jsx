import axios from './axios.customize';
const createProducts = (name, description, price, quantityInStock, imageUrl, categoryId) => {
    const URL_PRODUCTS = "/api/Products"
    const data = {
        Name: name,
        Description: description,
        Price: price,
        QuantityInStock: quantityInStock,
        ImageUrl: imageUrl,
        CategoryId: categoryId
    }
    return axios.post(URL_PRODUCTS, data)
}
const updateProducts = (id, name, description, price, quantityInStock, imageUrl, categoryId) => {
    const URL_PRODUCTS = `/api/Products/${id}`
    const data = {
        Id: id,
        Name: name,
        Description: description,
        Price: price,
        QuantityInStock: quantityInStock,
        ImageUrl: imageUrl,
        CategoryId: categoryId
    }
    return axios.put(URL_PRODUCTS, data)
}
const deleteProducts = (id) => {
    const URL_PRODUCTS = `/api/Products/${id}`;
    return axios.delete(URL_PRODUCTS)
}
const getAllProducts = () => {
    const URL_PRODUCTS = "/api/Products";
    return axios.get(URL_PRODUCTS)
}
const uploadProductImage = (formData) => {
    return axios.post("/api/Products/upload", formData);
};
const getProductById = (id) => {
    const URL_PRODUCTS = `/api/Products/${id}`;
    return axios.get(URL_PRODUCTS);
};
export { createProducts, updateProducts, deleteProducts, getAllProducts, uploadProductImage, getProductById }