import {
    LOAD_USERS,
    LOADING
} from '../actions/types';

const initialState = {
    users: [],
    user: null,
    loading: false,
  };

  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type){
        case LOAD_USERS:
            return {
                ...state,
                users: payload,
                user: null,
                loading: false,
            };
            break;
        case LOADING:
            return {
                ...state,
                loading:true
            };
            break;
        default: return state;
    }
  }