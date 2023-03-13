import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    positions: [],
    roles: [],
    times: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allRequiredDoctorInfor: []
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER:
            return {
                ...state
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data
            };
        case actionTypes.FETCH_GENDER_FAIL:
            return {
                ...state,
                genders: []
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data
            };
        case actionTypes.FETCH_POSITION_FAIL:
            return {
                ...state,
                positions: []
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data
            };
        case actionTypes.FETCH_ROLE_FAIL:
            return {
                ...state,
                roles: []
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            return {
                ...state,
                allRequiredDoctorInfor: action.data
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL:
            return {
                ...state,
                allRequiredDoctorInfor: []
            };
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.data
            };
        case actionTypes.FETCH_ALL_USERS_FAIL:
            return {
                ...state,
                users: []
            };
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            return {
                ...state,
                topDoctors: action.data
            };
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            return {
                ...state,
                topDoctors: []
            };
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            return {
                ...state,
                allDoctors: action.data
            };
        case actionTypes.FETCH_ALL_DOCTORS_FAIL:
            return {
                ...state,
                allDoctors: []
            };
        case actionTypes.FETCH_SCHEDULE_SUCCESS:
            return {
                ...state,
                times: action.data
            };
        case actionTypes.FETCH_SCHEDULE_FAIL:
            return {
                ...state,
                times: []
            };
        default:
            return state;
    }
};

export default adminReducer;