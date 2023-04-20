import axios from "axios";
import { HS } from "../utils/constants";

const initialState = [];

const GET_SKILLS_SUCCESS = "GET_SKILLS_SUCCESS";
const RESET_SKILLS_SUCCESS = "RESET_SKILLS_SUCCESS";
export function skillsReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_SKILLS_SUCCESS":
      return {
        ...state,
        skills: action.payload,
      };
    case "RESET_SKILLS_SUCCESS":
      return {
        skills: action.payload,
      };
    default:
      return state;
  }
}

export const getSkills =
  (token, page = 1) =>
  async (dispatch, getState) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const { data } = await axios.get(
        `${HS}/v1/skills?page=${page}&limit=60`,
        {
          headers,
        }
      );
      dispatch({
        type: GET_SKILLS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

export const resetSkills = () => (dispatch, getState) => {
  dispatch({
    type: RESET_SKILLS_SUCCESS,
    payload: {},
  });
};
