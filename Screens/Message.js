import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { InfoState } from "../Context/InfoProvider";
import { loggedUser } from "../Functions/LoggedUser";
import { Avatar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { getTkn } from "../Functions/token";
import axios from "axios";
import { URL } from "../API/api";
import { io } from "socket.io-client";

const ENDPOINT = URL;
let socket, selectedChatCompare;
const Message = ({ navigation }) => {
  const { selectedChat, user, setNotifications, notifications } = InfoState();
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <View style={styles.img}>
            <Image
              source={{
                uri: selectedChat.product.images[0],
              }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
            <Avatar
              source={{
                uri: loggedUser(selectedChat.users, user).profile_img,
              }}
              rounded
              style={styles.profile_img}
            />
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.name}>
              {loggedUser(selectedChat.users, user).name}
            </Text>
            <Text style={styles.title}>{selectedChat.product.title}</Text>
          </View>
        </View>
      ),
    });
  }, []);

  const fetchMessages = () => {
    getTkn().then((tkn) => {
      let config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tkn}`,
        },
      };

      axios
        .get(`${URL}/message/all/${selectedChat._id}`, config)
        .then((res) => {
          setMessages(res.data);
          socket.emit("join chat", selectedChat._id);
        });
    });
  };

  const sendMessage = () => {
    getTkn().then(async (tkn) => {
      let config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tkn}`,
        },
      };

      let body = {
        content: message,
        chatId: selectedChat._id,
      };

      let { data } = await axios.post(`${URL}/message/send`, body, config);
      socket.emit("new message", data);
      setMessages([...messages, data]);
    });
    setMessage("");
  };
  //   const socket = useRef()

  useEffect(() => {
    socket = io("http://192.168.1.7:5555");
    socket.emit("setup", user);

    socket.on("connected", () => console.log("connected"));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  // console.log(notifications.length);
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      // console.log(newMessageReceived, "new");

      setMessages([...messages, newMessageReceived]);
    });
  });
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        style={styles.container}
      >
        <>
          <View style={styles.page}>
            <FlatList
              data={[...messages].reverse()}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.msgContainer,
                    item.sender._id === user._id ? styles.right : styles.left,
                  ]}
                >
                  <Text style={{ fontSize: 16 }}> {item.content}</Text>
                </View>
              )}
              inverted
            />
          </View>
        </>
        <View style={styles.footer}>
          <TextInput
            placeholder="Type a message"
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={styles.input}
            autoFocus={true}
            returnKeyType="send"
            onEndEditing={sendMessage}
          />

          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color={"#2b68e6"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  profile_img: {
    position: "absolute",
    bottom: -5,
    width: 20,
    height: 20,
    right: -5,
  },
  img: {
    width: 40,
    height: 40,
  },

  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  title: {
    color: "gray",
    fontSize: 13,
  },

  footer: {
    flexDirection: "row",
    width: "90%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    bottom: 10,
    position: "absolute",
    paddingTop: 5,
    borderTopWidth: 0.5,
    borderColor: "gray",
    width: "100%",
  },

  input: {
    // width: "90%",
    height: 40,
    flex: 1,
    marginLeft: 10,
    marginRight: 15,
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 10,
  },
  msgContainer: {
    padding: 10,
    margin: 10,
    // marginBottom: 5,
    borderRadius: 10,
    maxWidth: "75%",
  },
  left: {
    backgroundColor: "#cef8c7",
    marginLeft: 10,
    marginRight: "auto",
  },
  right: {
    backgroundColor: "#cbf0fb",
    marginLeft: "auto",
    marginRight: 10,
  },
  page: {
    marginBottom: 50,
  },
});
