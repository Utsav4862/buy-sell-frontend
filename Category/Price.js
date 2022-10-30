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
import { InfoState } from "../Context/InfoProvider";
import { Alert } from "react-native";

const Price = ({ route, navigation }) => {
  const { currLocation } = InfoState();
  const { category, detail, images, price, setPrice, setLocation } =
    sellDetailState();

  const next = (nav) => {
    if (price == 0) {
      Alert.alert("Oops", "Enter Valid Price");
      return;
    }
    navigation.navigate(nav);
    if (currLocation != undefined) {
      let tempLoc = `${currLocation.district}, ${currLocation.city}`;
      console.log(tempLoc, "temp");
      setLocation(tempLoc);
    } else {
      setLocation("");
    }
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
    width: "100%",
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
