import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useState } from "react";

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [location, setLocation] = useState();
  return (
    <InfoContext.Provider value={{ location, setLocation }}>
      {children}
    </InfoContext.Provider>
  );
};

export const InfoState = () => {
  return useContext(InfoContext);
};

export default InfoProvider;

const styles = StyleSheet.create({});
