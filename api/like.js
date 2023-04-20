import axios from "axios";
import { HS } from "../utils/constants";

export const postLikeAPI = async (token, key) => {
  let response;
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
    response = data;
    return response;
  } catch (error) {
    console.error(first);
  }
};

export const getUsers = async (token, page) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(
      `${HS}/v1/users/feed?page=${page}&&populate=skills`,
      {
        headers,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
