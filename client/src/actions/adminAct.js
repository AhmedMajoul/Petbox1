import axios from 'axios';
import { setAlert } from './alert';
import {
    LOAD_USERS,
    LOAD_USER,
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

// get one user
export const getUser = (id) => async dispatch => {
    try {
        dispatch({type: LOADING});
        const res = await axios.get(`api/users/${id}`);

        dispatch({
            type: LOAD_USER,
            payload: res.data
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: AUTH_ERROR
        });
    }
};