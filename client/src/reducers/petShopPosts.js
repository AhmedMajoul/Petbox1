import {

	GET_SHOP_POSTS,
	POST_SHOP_ERROR,
	DELETE_SHOP_POST,
	ADD_SHOP_POST,
	UPDATE_SHOP_LIKES,
	GET_SHOP_POST,
	ADD_SHOP_COMMENT,
	REMOVE_SHOP_COMMENT,
	PUT_SHOP_POSt,

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
	  case GET_SHOP_POSTS:
		return {
		  ...state,
		  petShopPosts: payload,
		  loading: false
		};
	  case GET_SHOP_POST:
		return {
		  ...state,
		  petShopPost: payload,
		  loading: false
		};
	  case ADD_SHOP_POST:
		return {
		  ...state,
		  petShopPosts: [payload, ...state.petShopPosts],
		  loading: false
		};
	  case DELETE_SHOP_POST:
		return {
		  ...state,
		  petShopPosts: state.petShopPosts.filter(post => post._id !== payload),
		  loading: false
		};
	  case POST_SHOP_ERROR:
		return {
		  ...state,
		  error: payload,
		  loading: false
		};
	  case UPDATE_SHOP_LIKES:
		return {
		  ...state,
		  petShopPosts: state.petShopPosts.map(post =>
			post._id === payload.id ? { ...post, likes: payload.likes } : post
		  ),
		  loading: false,
		};
	  case ADD_SHOP_COMMENT:
		return {
		  ...state,
		  petShopPosts: state.petShopPosts.map(post =>
			post._id === payload.id ? { ...post, comments:payload.comments} : post
		  ),
		  loading: false
		};
	  case REMOVE_SHOP_COMMENT:
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
	  case PUT_SHOP_POSt:
		return {
		  ...state,
		  petShopPosts: state.petShopPosts.map(post =>
			post._id === payload.id ? { ...payload.new } : post
		  ),
		  loading: false,
		};
	default:
		return state;
	}
  }


