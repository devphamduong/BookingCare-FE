import axios from '../axios';

const handleLogin = (email, password) => {
    return axios.post('api/login', { email, password });
};

const getAllUsers = (id) => {
    return axios.get(`api/get-all-users?id=${id}`);
};

const createUser = (data) => {
    return axios.post('api/create-user', data);
};

export { handleLogin, getAllUsers, createUser };