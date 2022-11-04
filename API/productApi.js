import axios from "axios";
import { Err } from "../Functions/Error";
import { URL } from "./api";
import { getConfig } from "./config";

export const fetchProducts = async () => {
  try {
    let config = await getConfig();
    let { data } = await axios.get(`${URL}/product/all`, config);
    return data;
  } catch (error) {
    Err();
  }
};

export const searchProd = async (search, loc) => {
  try {
    let config = await getConfig();

    let { data } = await axios.get(
      `${URL}/product/searchProducts?search=${search}&location=${loc}`,
      config
    );
    return data;
  } catch (error) {
    Err();
  }
};

export const addProd = async (detail, config) => {
  try {
    let { data } = await axios.post(`${URL}/product/add`, detail, config);
    console.log(data);
    return data;
  } catch (error) {
    Err();
  }
};

export const likeUnlikeProd = async (value, body) => {
  try {
    let config = await getConfig();
    let { data } = await axios.put(`${URL}/product/${value}`, body, config);
    return data;
  } catch (error) {
    Err();
  }
};

export const delProd = async (productId) => {
  try {
    let config = await getConfig();
    let { data } = await axios.delete(
      `${URL}/product/delete/${productId}`,
      config
    );
    return data;
  } catch (error) {
    Err();
  }
};

export const myProd = async () => {
  try {
    let config = await getConfig();
    let { data } = await axios.get(`${URL}/product/myProducts/`, config);
    return data;
  } catch (error) {
    Err();
  }
};
