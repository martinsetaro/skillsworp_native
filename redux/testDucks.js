// JS to test redux functions
import axios from "axios";

const initialState = [];

// Actions

const GET_ALL_CHARACTERS = "GET_ALL_CHARACTERS";

// reducer
export default function testReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_CHARACTERS":
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
}

// Action creators

export const getTestService = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    //console.log(data)
    dispatch({
      type: GET_ALL_CHARACTERS,
      payload: data.results,
    });
  } catch (error) {
    console.error(error);
  }
};
