import axios from '../axios';

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password });
};

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
};

const createUser = (data) => {
    return axios.post('/api/create-user', data);
};

const deleteUser = (id) => {
    return axios.delete('/api/delete-user', {
        data: { id }
    });
};

const updateUser = (data) => {
    return axios.put('/api/edit-user', data);
};

const getAllCode = (type) => {
    return axios.get(`/api/allcode?type=${type}`);
};

const getTopDoctor = (limit) => {
    return axios.get(`/api/top-doctor?limit=${limit}`);
};

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
};

const saveInforDoctor = (data) => {
    return axios.post(`/api/save-infor-doctor`, data);
};

const getDetailDoctorById = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const bulkCreateSchedule = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleByDate = (doctorId, date) => {
    return axios.get(`/api/get-doctor-schedule-by-date?doctorId=${doctorId}&date=${date}`);
};

const getDoctorExtraInforById = (doctorId) => {
    return axios.get(`/api/get-doctor-extra-infor-by-id?doctorId=${doctorId}`);
};

const getDoctorProfileById = (doctorId) => {
    return axios.get(`/api/get-doctor-profile-by-id?doctorId=${doctorId}`);
};

const makeAnAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
};

const verifyAnAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
};

const createSpecialty = (data) => {
    return axios.post(`/api/create-specialty`, data);
};

const getAllSpecialties = () => {
    return axios.get(`/api/get-all-specialties`);
};

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};

const createClinic = (data) => {
    return axios.post(`/api/create-clinic`, data);
};

const getAllClinics = () => {
    return axios.get(`/api/get-all-clinics`);
};

const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}&location=${data.location}`);
};

const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
};

const sendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data);
};

export { handleLogin, getAllUsers, createUser, deleteUser, updateUser, getAllCode, getTopDoctor, getAllDoctors, saveInforDoctor, getDetailDoctorById, bulkCreateSchedule, getScheduleByDate, getDoctorExtraInforById, getDoctorProfileById, makeAnAppointment, verifyAnAppointment, createSpecialty, getAllSpecialties, getDetailSpecialtyById, createClinic, getAllClinics, getDetailClinicById, getListPatientForDoctor, sendRemedy };