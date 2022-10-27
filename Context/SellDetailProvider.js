import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useState } from "react";

const sellDetailContext = createContext();

const SellDetailProvider = ({ children }) => {
  const [category, setCategory] = useState();
  //   const [detail, setDetail] = useState({});

  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const [subCat, setSubCat] = useState();
  const [location, setLocation] = useState();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState();
  const [km, setKm] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <sellDetailContext.Provider
      value={{
        category,
        setCategory,
        brand,
        setBrand,
        model,
        setModel,
        year,
        setYear,
        km,
        setKm,
        title,
        setTitle,
        desc,
        setDesc,
        images,
        setImages,
        price,
        setPrice,
        subCat,
        setSubCat,
        location,
        setLocation,
      }}
    >
      {children}
    </sellDetailContext.Provider>
  );
};

export const sellDetailState = () => {
  return useContext(sellDetailContext);
};

export default SellDetailProvider;

const styles = StyleSheet.create({});
