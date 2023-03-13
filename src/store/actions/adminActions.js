import { toast } from 'react-toastify';
import { createUser, deleteUser, getAllCode, getAllDoctors, getAllUsers, getTopDoctor, saveInforDoctor, updateUser } from '../../services/userService';
import actionTypes from './actionTypes';

export const fetchGender = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER
            });
            let res = await getAllCode('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            console.log(error);
        }
    };
};
export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data
});
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
});

export const fetchPosition = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchPositionFail());
            console.log(error);
        }
    };
};
export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data
});
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
});

export const fetchRole = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
            console.log(error);
        }
    };
};
export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data
});
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
});

export const fetchRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR
            });
            let resPrice = await getAllCode('PRICE');
            let resPayment = await getAllCode('PAYMENT');
            let resProvince = await getAllCode('PROVINCE');
            if (resPrice && resPrice.errCode === 0 && resPayment && resPayment.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                };
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFail());
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInforFail());
            console.log(error);
        }
    };
};
export const fetchRequiredDoctorInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data
});
export const fetchRequiredDoctorInforFail = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createUser(data);
            if (res && res.errCode === 0) {
                toast.success('Created user successfully!');
                dispatch(createUserSuccess());
                dispatch(fetchAllUsers());
            } else {
                dispatch(createUserFail());
            }
        } catch (error) {
            dispatch(createUserFail());
            console.log(error);
        }
    };
};
export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
});
export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
});

export const updateAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateUser(data);
            if (res && res.errCode === 0) {
                toast.success('Updated user successfully!');
                dispatch(updateUserSuccess());
                dispatch(fetchAllUsers());
            } else {
                toast.success('Failed to update user!');
                dispatch(updateUserFail());
            }
        } catch (error) {
            toast.success('Failed to update user!');
            dispatch(updateUserFail());
            console.log(error);
        }
    };
};
export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
});
export const updateUserFail = () => ({
    type: actionTypes.UPDATE_USER_FAIL
});

export const deleteAUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(id);
            if (res && res.errCode === 0) {
                toast.success('Deleted user successfully!');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsers());
            } else {
                toast.success('Failed to delete user!');
                dispatch(deleteUserFail());
            }
        } catch (error) {
            toast.success('Failed to delete user!');
            dispatch(deleteUserFail());
            console.log(error);
        }
    };
};
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
});
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
});

export const fetchAllUsers = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error("Failed to fetch all users!");
                dispatch(fetchAllUsersFail());
            }
        } catch (error) {
            toast.error("Failed to fetch all users!");
            dispatch(fetchAllUsersFail());
            console.log(error);
        }
    };
};
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data
});
export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL
});

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctor('');
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorFail());
            }
        } catch (error) {
            dispatch(fetchTopDoctorFail());
            console.log(error);
        }
    };
};
export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data
});
export const fetchTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAIL
});

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorsFail());
            }
        } catch (error) {
            dispatch(fetchAllDoctorsFail());
            console.log(error);
        }
    };
};
export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    data
});
export const fetchAllDoctorsFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAIL
});

export const saveInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        let res = '';
        try {
            res = await saveInforDoctor(data);
            if (res && res.errCode === 0) {
                toast.success(res.message);
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_SUCCESS
                });
            } else {
                toast.error(res.errMessage);
                dispatch({
                    type: actionTypes.SAVE_INFOR_DOCTOR_FAIL
                });
            }
        } catch (error) {
            toast.error(res.errMessage);
            dispatch({
                type: actionTypes.SAVE_INFOR_DOCTOR_FAIL
            });
            console.log(error);
        }
    };
};

export const fetchSchedule = () => {
    return async (dispatch, getState) => {
        let res = '';
        try {
            res = await getAllCode('TIME');
            if (res && res.errCode === 0) {
                toast.success(res.message);
                dispatch({
                    type: actionTypes.FETCH_SCHEDULE_SUCCESS,
                    data: res.data
                });
            } else {
                toast.error(res.errMessage);
                dispatch({
                    type: actionTypes.FETCH_SCHEDULE_FAIL
                });
            }
        } catch (error) {
            toast.error(res.errMessage);
            dispatch({
                type: actionTypes.FETCH_SCHEDULE_FAIL
            });
            console.log(error);
        }
    };
};