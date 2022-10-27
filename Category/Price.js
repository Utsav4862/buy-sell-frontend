import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { sellDetailState } from "../Context/SellDetailProvider";

const Price = ({ route, navigation }) => {
  const { category, detail, images, price, setPrice } = sellDetailState();

  const next = (nav) => {
    navigation.navigate(nav);
  };

  useEffect(() => {
    setPrice(0);
  }, []);
  return (
    <View style={styles.main}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.searchContainer}>
          <FontAwesome name="rupee" size={15} />
          <TextInput
            style={styles.input}
            placeholder={"Price"}
            keyboardType="numeric"
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => next("Location")}>
          <Text style={{ fontWeight: "bold", color: "#fff" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    backgroundColor: "#e9eff4",
    height: 50,
    marginTop: 20,
    padding: 10,
    // borderRadius: 10,
    margin: 10,
    borderBottomWidth: 1,
  },
  input: {
    marginLeft: 7,
  },

  btn: {
    backgroundColor: "#2abe6c",
    height: 50,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    margin: 10,
    marginBottom: 20,
    marginTop: 50,
  },
});
