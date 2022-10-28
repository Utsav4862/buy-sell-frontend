import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useState } from "react";

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [currLocation, setCurrLocation] = useState();
  const [cat, setCat] = useState("");
  const [search, setSearch] = useState("");

  return (
    <InfoContext.Provider
      value={{ currLocation, setCurrLocation, cat, setCat, search, setSearch }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export const InfoState = () => {
  return useContext(InfoContext);
};

export default InfoProvider;

const styles = StyleSheet.create({});
