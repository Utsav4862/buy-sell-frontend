import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { getTkn } from "../Functions/token";
import axios from "axios";
import { URL } from "../API/api";
import { InfoState } from "../Context/InfoProvider";
import { loggedUser } from "../Functions/LoggedUser";
import { Avatar } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";

const Chat = ({ navigation }) => {
  const { chats, setChats, user, setSelectedChat, notifications } = InfoState();

  const fetchChats = () => {
    getTkn().then((tkn) => {
      let config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tkn}`,
        },
      };
      axios.get(`${URL}/chat/fetch`, config).then((res) => {
        setChats(res.data);
      });
    });
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
    navigation.navigate("Message");
  };
  useFocusEffect(
    useCallback(() => {
      fetchChats();
    }, [])
  );
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ marginBottom: 50 }}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Chat</Text>
        </View>
        <View style={styles.headerSearch}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={15}
              style={{ fontWeight: "bold", marginRight: 10 }}
            />
            <TextInput placeholder="Search" style={styles.input} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.chatContainer}>
          {chats.map((chat) => (
            <TouchableHighlight
              key={chat._id}
              style={{ width: "90%", alignItems: "center" }}
              underlayColor={"#f0f0f0"}
              onPress={() => selectChat(chat)}
            >
              <View style={styles.card}>
                <View style={styles.img}>
                  <Image
                    source={{
                      uri: chat.product.images[0],
                    }}
                    style={{ width: "100%", height: "100%", borderRadius: 20 }}
                  />
                  <Avatar
                    source={{
                      uri: loggedUser(chat.users, user).profile_img,
                    }}
                    rounded
                    style={styles.profile_img}
                  />
                </View>

                <View style={styles.detail}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    {loggedUser(chat.users, user).name}
                  </Text>
                  <Text>{chat.product.title}</Text>
                  <Text>
                    {chat.latestMessage ? chat.latestMessage.content : ""}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
  },
  headerTxt: {
    fontSize: 35,
    fontWeight: "bold",
  },

  headerSearch: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    height: 40,
    backgroundColor: "#f0f0f0",
    width: "90%",
  },

  searchContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    height: 40,
    padding: 10,
    borderRadius: 10,
  },
  chatContainer: {
    flexDirection: "column",
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  card: {
    width: "100%",
    height: 85,
    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    paddingBottom: 7,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  detail: {
    height: "100%",
    marginLeft: 20,
    justifyContent: "center",
  },

  profile_img: {
    position: "absolute",
    bottom: -10,
    width: 30,
    height: 30,
    borderRadius: 30,
    right: -10,
  },
});
