import axios from 'axios';
import { setAlert } from './alert';
import {
    LOAD_USERS,
    LOADING,
    AUTH_ERROR
} from './types';

import setAuthToken from '../utils/setAuthToken';

// get all users
export const getAllUsers = () => async dispatch => {
    try {
        dispatch({type: LOADING});
        const res = await axios.get('/api/users');

        dispatch({
            type: LOAD_USERS,
            payload: res.data
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: AUTH_ERROR
        });
    }
};