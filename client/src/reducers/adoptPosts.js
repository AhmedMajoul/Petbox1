import {
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	DELETE_POST,
	ADD_POST,
	GET_POST,
	ADD_COMMENT,
	REMOVE_COMMENT,
	PUT_POST
  } from '../actions/types';
  
  const initialState = {
	adoptposts: [],
	adoptpost: null,
	loading: true,
	error: {}
  };
  
  export default function(state = initialState, action) {
	const { type, payload } = action;
  
	switch (type) {
	  case GET_POSTS:
		return {
		  ...state,
		  adoptposts: payload,
		  loading: false
		};
	  case GET_POST:
		return {
		  ...state,
		  adoptpost: payload,
		  loading: false
		};
	  case ADD_POST:
		return {
		  ...state,
		  adoptposts: [payload, ...state.adoptposts],
		  loading: false
		};
	  case DELETE_POST:
		return {
		  ...state,
		  adoptposts: state.adoptposts.filter(post => post._id !== payload),
		  loading: false
		};
	  case POST_ERROR:
		return {
		  ...state,
		  error: payload,
		  loading: false
		};
	  case UPDATE_LIKES:
		return {
		  ...state,
		  adoptposts: state.adoptposts.map(post =>
			post._id === payload.id ? { ...post, likes: payload.likes } : post
		  ),
		  loading: false,
		};
	  case ADD_COMMENT:
		return {
		  ...state,
		  adoptposts: state.adoptposts.map(post =>
			post._id === payload.id ? { ...post, comments:payload.comments} : post
		  ),
		//   { ...state.adoptpost, comments: payload },
		  loading: false
		};
	  case REMOVE_COMMENT:
		return {
		  ...state,
		  adoptpost: {
			...state.adoptpost,
			comments: state.adoptpost.comments.filter(
			  comment => comment._id !== payload
			)
		  },

		  loading: false
		};
	case PUT_POST:
		return {
		  ...state,
		  adoptposts: state.adoptposts.map(post =>
			post._id === payload.id ? { ...post, text: payload.new.text } : post
		  ),
		  loading: false,
		};
	  default:
		return state;
	}
  }
