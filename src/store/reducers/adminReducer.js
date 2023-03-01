import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    positions: [],
    roles: []
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
        default:
            return state;
    }
};

export default adminReducer;