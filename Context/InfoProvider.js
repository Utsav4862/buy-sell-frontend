import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useState } from "react";

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [currLocation, setCurrLocation] = useState();
  return (
    <InfoContext.Provider value={{ currLocation, setCurrLocation }}>
      {children}
    </InfoContext.Provider>
  );
};

export const InfoState = () => {
  return useContext(InfoContext);
};

export default InfoProvider;

const styles = StyleSheet.create({});
