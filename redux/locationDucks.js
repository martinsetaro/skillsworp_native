const initialState = {};

const SAVE_LOCATION = "SAVE_LOCATION";
const SAVE_ADDRESS = "SAVE_ADDRESS";

export function locationReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_LOCATION":
      return {
        ...state,
        location: action.payload,
      };
    case "SAVE_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };

    default:
      return state;
  }
}

export const saveLocation = (location) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVE_LOCATION,
      payload: location,
    });
  } catch (error) {
    console.error(error);
  }
};

export const saveAddress = (address) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVE_ADDRESS,
      payload: address,
    });
  } catch (error) {
    console.error(error);
  }
};
