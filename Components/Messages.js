import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { InfoState } from "../Context/InfoProvider";
import { loggedUser } from "../Functions/LoggedUser";
import { SafeAreaView } from "react-native";

const Messages = ({ messages }) => {
  const { user, selectedChat } = InfoState();

  useEffect(() => {
    console.log(messages, "ffffff");
  }, []);
  return (
    <View style={styles.page}>
      <FlatList
        data={messages}
        // scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={[
              styles.msgContainer,
              {
                marginLeft: item.sender._id == user._id ? "auto" : 10,
                marginRight: item.sender._id == user._id ? 10 : "auto",
              },
            ]}
          >
            <Text style={{ fontSize: 25 }}> 123 {item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  msgContainer: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
