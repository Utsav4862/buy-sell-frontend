import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TextFontBold = ({ children }) => {
  return <Text style={styles.fonts}>{children}</Text>;
};

export default TextFontBold;

const styles = StyleSheet.create({
  fonts: {
    fontFamily: "ProximaNovaBold",
    fontSize: 14,
  },
});
