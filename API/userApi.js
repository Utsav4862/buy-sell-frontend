import axios from "axios";
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
  let { data } = await axios.post(`${URL}/user/signup`, {
    name: name,
    email: email,
    password: password,
  });

  return data;
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

export const updateImage = async (image, config) => {
  try {
    let { data } = await axios.put(`${URL}/user/updateImage`, image, config);
    return data;
  } catch (error) {
    console.log(error, "errr");
  }
};
