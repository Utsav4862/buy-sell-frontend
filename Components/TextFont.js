import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TextFont = ({ children }) => {
  return <Text style={styles.fonts}>{children}</Text>;
};

export default TextFont;

const styles = StyleSheet.create({
  fonts: {
    fontFamily: "ProximaNova",
    fontSize: 14,
  },
});
