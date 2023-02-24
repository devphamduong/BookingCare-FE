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

const deleteUser = (id) => {
    return axios.delete('api/delete-user', {
        data: { id }
    });
};

export { handleLogin, getAllUsers, createUser, deleteUser };