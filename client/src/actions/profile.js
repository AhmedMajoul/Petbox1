import {GET_PROFILE,PROFILE_ERROR} from "./types";
import axios from 'axios'

export const getProfileById = (id) => async dispatch => {
	try{
		const res = await axios.get(`/api/users/${id}`)
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		  })
	}
	catch (err) {
		console.log(err)
		dispatch({
		  type: PROFILE_ERROR
		});
	  }
}