import axios from "axios";
const instance = axios.create({
    //lấy ở môi trường env.development
    baseURL: import.meta.env.VITE_BACKEND_URL
});
// intand.defaults.headers.common['Authorization'] = AUTH_TOKEN;


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {

    //kiểm tra điều kiện và trả về dữ liệu
    if (response.data && response.data.data) {
        return response.data
    }
    return response;
}, function (error) {
    // chạy debugger này để nhận lấy err trả về và check
    // debugger 
    if (error.response && error.response.data) {
        return error.response.data
    }
    return Promise.reject(error);
});
export default instance;