import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useState } from "react";

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [currLocation, setCurrLocation] = useState();
  const [cat, setCat] = useState("");
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notifications, setNotifications] = useState([]);

  const [chats, setChats] = useState([]);
  const [per, setPer] = useState(true);

  return (
    <InfoContext.Provider
      value={{
        currLocation,
        setCurrLocation,
        cat,
        setCat,
        search,
        setSearch,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notifications,
        setNotifications,
        per,
        setPer,
      }}
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
