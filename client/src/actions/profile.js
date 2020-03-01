import {GET_PROFILE,PROFILE_ERROR,PUT_PROFILE,DELETE_PROFILE} from "./types";
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

export const putProfile = (newProfile) => async dispatch => {
	try{
		const res = await axios.put(`/api/users`,newProfile)
		dispatch({
			type: PUT_PROFILE,
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

// export const getProfileById = (id) => async dispatch => {
// 	try{
// 		const res = await axios.get(`/api/users/${id}`)
// 		dispatch({
// 			type: GET_PROFILE,
// 			payload: res.data
// 		  })
// 	}
// 	catch (err) {
// 		console.log(err)
// 		dispatch({
// 		  type: PROFILE_ERROR
// 		});
// 	  }
// }