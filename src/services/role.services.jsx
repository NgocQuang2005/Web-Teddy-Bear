import axios from './../services/axios.customize';
const createRole = (name, description) => {
    const URL_ROLE = "/api/Roles"
    const data = {
        Name: name,
        Description: description
    }
    return axios.post(URL_ROLE, data)
}
const updateRole = (id, name, description) => {
    const URL_ROLE = `/api/Roles/${id}`
    const data = {
        Id: id,
        Name: name,
        Description: description
    }
    return axios.put(URL_ROLE, data)
}
const deleteRole = (id) => {
    const URL_ROLE = `/api/Roles/${id}`;
    return axios.delete(URL_ROLE)
}
const getAllRoles = () => {
    const URL_ROLE = "/api/Roles";
    return axios.get(URL_ROLE)
}
export { createRole, updateRole, deleteRole, getAllRoles }