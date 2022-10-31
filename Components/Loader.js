import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "black",
        backgroundColor: "transparent",
      }}
    >
      <ActivityIndicator size={"large"} color={"#2abe6c"} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
