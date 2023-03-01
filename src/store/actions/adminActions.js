import { getAllCode } from '../../services/userService';
import actionTypes from './actionTypes';

export const fetchGender = () => {
    return async (dispatch, getState) => {
        try {
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