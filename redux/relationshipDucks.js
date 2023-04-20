import axios from "axios";
import { HS } from "../utils/constants";

const initialState = {};

// action
const ALL_USERS_SUCCESS = "ALL_USERS_SUCCESS";
const ALL_USER_FAILED = "ALL_USER_FAILED";
const LIKE_SUCCESS = "LIKE_SUCCESS";
const LIKE_FAILED = "LIKE_FAILED";
const RESET_LIKES_STATE = "RESET_LIKES_STATE";
// Reducer
export function relationshipReducer(state = initialState, action) {
  switch (action.type) {
    case "ALL_USERS_SUCCESS":
      return {
        ...state,
        results: action.payload,
      };
    case "ALL_USERS_FAILED":
      return {
        ...state,
        results: null,
        errorMessageGA: action.payload,
      };
    case "LIKE_SUCCESS":
      return {
        ...state,
        likes: action.payload,
        errorMessageLike: null,
      };
    case "LIKE_FAILED":
      return {
        ...state,
        likes: null,
        errorMessageLike: action.payload,
      };
    case "RESET_LIKES_STATE":
      return {
        ...state,
        likes: null,
        errorMessageLike: null,
      };
    default:
      return state;
  }
}

// actions
export const getAllUsers =
  (token, page = 1) =>
  async (dispatch) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.get(
        `${HS}/v1/users?page=${page}&&populate=skills`,
        {
          headers,
        }
      );
      dispatch({
        type: ALL_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_USER_FAILED,
        payload: error.response.data.message,
      });
    }
  };

export const postLike = (token, key) => async (dispatch, getState) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.post(
      `${HS}/v1/relationship/${key}/like`,
      {},
      {
        headers,
      }
    );
    dispatch({
      type: LIKE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIKE_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const resetLike = () => (dispatch, getState) => {
  try {
    dispatch({
      type: RESET_LIKES_STATE,
      payload: null,
    });
  } catch (error) {
    console.error(error);
  }
};
