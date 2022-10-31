import axios from "axios";
import { Err } from "../Functions/Error";
import { URL } from "./api";
import { getConfig } from "./config";

export const getChats = async () => {
  try {
    let config = await getConfig();
    let { data } = await axios.get(`${URL}/chat/fetch`, config);
    return data;
  } catch (error) {
    console.log(error);
    Err();
  }
};

export const getMessages = async (selectedChatId) => {
  try {
    let config = await getConfig();
    let { data } = await axios.get(
      `${URL}/message/all/${selectedChatId}`,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    Err();
  }
};

export const sendMsg = async (body) => {
  try {
    let config = await getConfig();
    let { data } = await axios.post(`${URL}/message/send`, body, config);
    return data;
  } catch (error) {
    console.log(error);
    Err();
  }
};
