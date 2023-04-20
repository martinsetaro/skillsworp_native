const initialState = {};

const LOAD_SIGNUP_INFO = "LOAD_SIGNUP_INFO";

export function registerReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_SIGNUP_INFO":
      return {
        ...state,
        registerInfo: action.payload,
      };

    default:
      return state;
  }
}

export const saveSignupInfo = (info) => (dispatch, getState) => {
  dispatch({
    type: LOAD_SIGNUP_INFO,
    payload: info,
  });
};
