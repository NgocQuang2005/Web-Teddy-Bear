import axios from './axios.customize';
const createCategories = (name, description) => {
    const URL_CATEGORY = "/api/Categories"
    const data = {
        Name: name,
        Description: description
    }
    return axios.post(URL_CATEGORY, data)
}
const updateCategories = (id, name, description) => {
    const URL_CATEGORY = `/api/Categories/${id}`
    const data = {
        Id: id,
        Name: name,
        Description: description
    }
    return axios.put(URL_CATEGORY, data)
}
const deleteCategories = (id) => {
    const URL_CATEGORY = `/api/Categories/${id}`;
    return axios.delete(URL_CATEGORY)
}
const getAllCategories = () => {
    const URL_CATEGORY = "/api/Categories";
    return axios.get(URL_CATEGORY)
}
export { createCategories, updateCategories, deleteCategories, getAllCategories }