import axios from './axios.customize';
const createCombinedOrders = (userId, status, orderDetails) => {
    const URL_CATEGORY = "/api/CombinedOrders"
    const data = {
        UserId: userId,
        Status: status,
        OrderDetails: orderDetails.map(item => ({
            ProductId: item.productId,
            Quantity: item.quantity
        }))
    };
    return axios.post(URL_CATEGORY, data)
}
const updateCombinedOrders = (id, userId, status, orderDetails) => {
    const URL_CATEGORY = `/api/CombinedOrders/${id}`
    const data = {
        UserId: userId,
        Status: status,
        OrderDetails: orderDetails.map(item => ({
            ProductId: item.productId,
            Quantity: item.quantity
        }))
    };
    return axios.put(URL_CATEGORY, data)
}
const deleteCombinedOrders = (id) => {
    const URL_CATEGORY = `/api/CombinedOrders/${id}`;
    return axios.delete(URL_CATEGORY)
}
const getAllCombinedOrders = () => {
    const URL_CATEGORY = "/api/CombinedOrders";
    return axios.get(URL_CATEGORY)
}
export { createCombinedOrders, updateCombinedOrders, deleteCombinedOrders, getAllCombinedOrders }