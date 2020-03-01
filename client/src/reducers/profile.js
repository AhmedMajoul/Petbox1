import {GET_PROFILE} from "../actions/types";

const initialState = {
  // id: null,
  // name: null,
  // email: null,
  // avatar: null,
  // adress: null,
  // phone: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        // ...state,
        // id: payload._id,
        // name: payload.name,
        // email: payload.email,
        // avatar: payload.avatar,
        // adress: payload.adress,
        // phone: payload.phone
	  };
    default:
      return state;
  }
}
