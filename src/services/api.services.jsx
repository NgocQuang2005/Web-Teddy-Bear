import axios from './../services/axios.customize';
const registerClient = (fullname, email, passwordhash, phonenumber, address) => {
    const URL_USERS = "/api/Users";
    const data = {
        FullName: fullname,
        Email: email,
        PasswordHash: passwordhash,
        PhoneNumber: phonenumber,
        Address: address,
        RoleId: 2,
    }
    return axios.post(URL_USERS, data)
}
const loginClient = (email, passwordhash) => {
    const URL_LOGINCLIENT = "/api/Users/login";
    const data = {
        Email: email,
        PasswordHash: passwordhash,
    }
    return axios.post(URL_LOGINCLIENT, data)
}
const loginAdmin = (email, passwordhash) => {
    const URL_LOGIN = "/api/Users/admin/login";
    const data = {
        Email: email,
        PasswordHash: passwordhash,
        RoleId: 1
    }
    return axios.post(URL_LOGIN, data)
}
const createUser = (fullname, email, passwordhash, phonenumber, address, roleid) => {
    const URL_USERS = "/api/Users";
    const data = {
        FullName: fullname,
        Email: email,
        PasswordHash: passwordhash,
        PhoneNumber: phonenumber,
        Address: address,
        RoleId: roleid,
    }
    return axios.post(URL_USERS, data)
}
const fetchAllUser = () => {
    const URL_USERS = "/api/Users";

    return axios.get(URL_USERS)
}
const deleteUser = (id) => {
    const URL_USERS = `/api/Users/${id}`;
    return axios.delete(URL_USERS)
}
const updateUser = (id, fullname, email, passwordhash, phonenumber, address, roleid) => {
    const URL_USER = `/api/Users/${id}`;
    const data = {
        Id: id,
        FullName: fullname,
        Email: email,
        PasswordHash: passwordhash,
        PhoneNumber: phonenumber,
        Address: address,
        RoleId: roleid || 0,
    }
    return axios.put(URL_USER, data)
}
const getRoles = () => {
    const URL_ROLE = `/api/Roles`;

    return axios.get(URL_ROLE)

}

export { registerClient, loginClient, loginAdmin, createUser, fetchAllUser, deleteUser, updateUser, getRoles }