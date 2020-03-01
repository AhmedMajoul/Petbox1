import {GET_PETS
  // PETS_ERROR
} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
	const { type, payload } = action;
switch(type){
	case GET_PETS:
        return[...state,...payload]
    default:
      return state;
  }
}