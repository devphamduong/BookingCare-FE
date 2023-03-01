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
            };
        default:
            return state;
    }
};

export default adminReducer;