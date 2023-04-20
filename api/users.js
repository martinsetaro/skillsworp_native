import axios from "axios";
import { HS } from "../utils/constants";

export const getUserByIdAPI = async (token, id) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${HS}/v1/users/${id}`, {
      headers,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
