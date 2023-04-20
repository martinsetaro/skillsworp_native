import axios from "axios";
import { HS } from "../utils/constants";

const initialState = {};

// actions
const GET_USER_SUCCESS = "GET_USER_SUCCESS";
const SAVE_USER_INFO = "SAVE_USER_INFO";
const SAVE_IMAGE_SUCCESS = "SAVE_IMAGE_SUCCESS";
//const POST_USERS_SUCCESS = "POST_USERS_SUCCESS";
const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
const SIGN_IN_FAILED = "SIGN_IN_FAILED";
const RESET_USER_REDUCER = "RESET_USER_REDUCER";
const GET_PROFILE_INFO = "GET_PROFILE_INFO";
const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
const SIGN_UP_FAILED = "SIGN_UP_FAILED";
const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
// reducer
export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        infoSigIn: action.payload,
        errorMessage: null,
      };

    case "SIGN_IN_FAILED":
      return {
        ...state,
        errorMessage: action.payload,
        infoSigIn: null,
      };

    case "GET_PROFILE_INFO":
      return {
        myInfo: action.payload,
      };

    case "RESET_USER_REDUCER":
      return initialState;

    case "LOG_OUT_SUCCESS":
      return action.payload;

    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        infoSigUp: action.payload,
        errorMessage: null,
      };
    case "SIGN_UP_FAILED":
      return {
        ...state,
        infoSigUp: null,
        errorMessage: action.payload,
      };
    /*UPDATED ACTIONS */
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        infoUpdate: action.payload,
        errorMessage: null,
      };
    case "UPDATE_USER_FAILED":
      return {
        ...state,
        infoUpdate: null,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
// actions creator

export const signIn = (credentials) => async (dispatch, getState) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(`${HS}/v1/auth/login`, credentials, {
      headers,
    });
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: { user: data.user, tokens: data.tokens },
    });
  } catch (error) {
    dispatch({
      type: SIGN_IN_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const loadProfileInfo = (userInfo) => (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PROFILE_INFO,
      payload: userInfo,
    });
  } catch (error) {
    console.error(error);
  }
};

export const resetUserReducer = () => (dispatch, getState) => {
  dispatch({
    type: RESET_USER_REDUCER,
    payload: {},
  });
};

export const logOut = (refreshToken) => async (dispatch, getState) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(
      `${HS}/v1/auth/logout`,
      { refreshToken },
      {
        headers,
      }
    );
    dispatch({
      type: LOG_OUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const registerProfile = (userInfo) => async (dispatch, getState) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(`${HS}/v1/auth/register`, userInfo, {
      headers,
    });
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const updateProfile =
  (id, params, token) => async (dispatch, getState) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.patch(`${HS}/v1/users/${id}`, params, {
        headers,
      });
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: UPDATE_USER_FAILED,
        payload: error.response.data.message,
      });
    }
  };
