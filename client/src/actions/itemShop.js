import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ITEMS,
  ITEM_ERROR,
  UPDATE_LIKES,
  DELETE_ITEM,
  ADD_ITEM,
  GET_ITEM,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// Get posts
export const getItems = () => async dispatch => {
  try {
    const res = await axios.get('/api/itemshop');
    console.log(res.data)
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    });
  } catch (err) {
    console.log("error:", err)
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/itemshop/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/itemshop/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deleteItem = id => async dispatch => {
  try {
    await axios.delete(`/api/itemshop/${id}`);

    dispatch({
      type: DELETE_ITEM,
      payload: id
    });

    dispatch(setAlert('Item Removed', 'success'));
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addItem = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/itemshop', formData, config);

    dispatch({
      type: ADD_ITEM,
      payload: res.data
    });

    dispatch(setAlert('Item Created', 'success'));
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
// export const getItem = id => async dispatch => {
//   try {
//     const res = await axios.get(`/api/itemshop/${id}`);

//     dispatch({
//       type: GET_ITEM,
//       payload: res.data
//     });
//   } catch (err) {
//     console.log('error', err)
//     dispatch({
//       type: ITEM_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Add comment
export const addComment = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/itemshop/comment/${id}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: { id, comments: res.data }
      // res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    console.log('error', err)
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (itemId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/itemshop/comment/${itemId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Modify like
export const editItem = id => async dispatch => {
  try {
    const res = await axios.put(`/api/itemshop/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};