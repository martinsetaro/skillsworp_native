import axios from "axios";
import { HS } from "../utils/constants";

const initialState = {};

//Actions
const POST_FORGOT_PASSWORD_SUCCESS = "POST_FORGOT_PASSWORD_SUCCESS";
const POST_FORGOT_PASSWORD_FAILED = "POST_FORGOT_PASSWORD_FAILED";
const RESET_AUTH_SUCCES = "RESET_AUTH_SUCCES";

// reducer
export function authReducer(state = initialState, action) {
  switch (action.type) {
    case "POST_FORGOT_PASSWORD_SUCCESS":
      return {
        ...state,
        recover_password: action.payload,
        errorMessage: null,
      };
    case "POST_FORGOT_PASSWORD_FAILED":
      return {
        ...state,
        recover_password: null,
        errorMessage: error.response.data.message,
      };
    case "RESET_AUTH_SUCCES":
      return initialState;
    default:
      return state;
  }
}

// actions
export const postForgotPassword = (email) => async (dispatch, getState) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    await axios.post(`${HS}/v1/auth/forgot-password`, { email }, headers);
    dispatch({
      type: POST_FORGOT_PASSWORD_SUCCESS,
      payload: 204,
    });
  } catch (error) {
    dispatch({
      type: POST_FORGOT_PASSWORD_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const resetAuth = () => async (dispatch, getState) => {
  dispatch({
    type: RESET_AUTH_SUCCES,
    action: {},
  });
};
