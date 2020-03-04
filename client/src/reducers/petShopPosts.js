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
	petShopPosts: [],
	petShopPost: null,
	loading: true,
	error: {}
  };
  
  export default function(state = initialState, action) {
	const { type, payload } = action;
  
	switch (type) {
	  case GET_POSTS:
		return {
		  ...state,
		  petShopPosts: payload,
		  loading: false
		};
	  case GET_POST:
		return {
		  ...state,
		  petShopPost: payload,
		  loading: false
		};
	  case ADD_POST:
		return {
		  ...state,
		  petShopPosts: [payload, ...state.petShopPosts],
		  loading: false
		};
	  case DELETE_POST:
		return {
		  ...state,
		  petShopPosts: state.petShopPosts.filter(post => post._id !== payload),
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
		  petShopPosts: state.petShopPosts.map(post =>
			post._id === payload.id ? { ...post, likes: payload.likes } : post
		  ),
		  loading: false,
		};
	  case ADD_COMMENT:
		return {
		  ...state,
		  petShopPosts: state.petShopPosts.map(post =>
			post._id === payload.id ? { ...post, comments:payload.comments} : post
		  ),
		//   { ...state.adoptpost, comments: payload },
		  loading: false
		};
	  case REMOVE_COMMENT:
		return {
		  ...state,
		  petShopPost: {
			...state.petShopPost,
			comments: state.petShopPost.comments.filter(
			  comment => comment._id !== payload
			)
		  },

		  loading: false
		};
	case PUT_POST:
		return {
		  ...state,
		  petShopPosts: state.petShopPosts.map(post =>
			post._id === payload.id ? { ...post, text: payload.new.text } : post
		  ),
		  loading: false,
		};
	  default:
		return state;
	}
  }

