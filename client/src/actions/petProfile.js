import {GET_PETS,PETS_ERROR} from "./types";
import axios from 'axios'

export const getPets = (id) => async dispatch => {
	try{
		const res = await axios.get(`/api/pets/byuserid/${id}`)
		dispatch({
			type: GET_PETS,
			payload: res.data
		  })
	}
	catch (err) {
		console.log(err)
		dispatch({
		  type: PETS_ERROR
		});
	  }
}
