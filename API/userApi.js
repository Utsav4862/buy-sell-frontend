import axios from "axios";
import { Alert } from "react-native";
import { getTkn } from "../Functions/token";
import { URL } from "./api";

export const loginUser = async (email, password) => {
  let { data } = await axios.post(`${URL}/user/login`, {
    email: email,
    password: password,
  });
  return data;
};

export const sendEmail = async (email, name) => {
  let { data } = await axios.post(`${URL}/user/sendEmail`, {
    name: name,
    email: email,
  });
  return data;
};

export const signupUser = async (name, email, password) => {
  let { data } = axios.post(`${URL}/user/signup`, {
    name: name,
    email: email,
    password: password,
  });
};

export const loggedUser = async (tkn) => {
  let config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${tkn}`,
    },
  };
  let { data } = await axios.get(`${URL}/user/currentUser`, config);
  return data;
};
