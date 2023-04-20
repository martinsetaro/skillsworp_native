import axios from "axios";
import { HS } from "../utils/constants";

export const getConversations = async (token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(`${HS}/v1/messages/conversations`, {
      headers,
    });
    return data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};

export const getMessages = async (token, id, page = 1) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(
      `${HS}/v1/messages?relationship=${id}&limit=20&page=${page}&sortBy=createdAt`,
      {
        headers,
      }
    );
    return data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};

export const postMessageAPI = async (token, key, content) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.post(
      `${HS}/v1/messages/?key=${key}`,
      content,
      {
        headers,
      }
    );
    return data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
