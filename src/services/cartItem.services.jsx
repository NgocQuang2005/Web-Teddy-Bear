import axios from './../services/axios.customize';
const createCartItems = (userId, productId, quantity) => {
    const URL_CART = "/api/CartItems"
    const data = {
        UserId: userId,
        ProductId: productId,
        Quantity: quantity
    }
    return axios.post(URL_CART, data)
}
const updateCartItems = (id, userId, productId, quantity) => {
    const URL_CART = `/api/CartItems/${id}`
    const data = {
        Id: id,
        UserId: userId,
        ProductId: productId,
        Quantity: quantity
    }
    return axios.put(URL_CART, data)
}
const deleteCartItems = (id) => {
    const URL_CART = `/api/CartItems/${id}`;
    return axios.delete(URL_CART)
}
const getAllCartItems = () => {
    const URL_CART = "/api/CartItems";
    return axios.get(URL_CART)
}
export { createCartItems, updateCartItems, deleteCartItems, getAllCartItems }