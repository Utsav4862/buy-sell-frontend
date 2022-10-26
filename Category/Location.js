import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { InfoState } from "../Context/InfoProvider";
import { Ionicons } from "@expo/vector-icons";

const Location = ({ route, navigation }) => {
  const { location } = InfoState();
  const [manLocation, setManLocation] = useState();
  const { category, detail, image, price } = route.params;
  const Post = () => {
    navigation.navigate("Home", {
      category: category,
      detail: detail,
      image: image,
      price: price,
      location: manLocation ? manLocation : location,
    });
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardDetails}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
            Your Current Location (Default)
          </Text>
          <Text style={{ fontWeight: "700", color: "#1d9bf0" }}>
            <Ionicons name="location" size={15} /> {location.district},{" "}
            {location.city}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.or}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>OR</Text>
      </View>
      <View style={{ marginTop: 10, margin: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          {" "}
          Choose Location Manually
        </Text>
        <TextInput
          placeholder="Area, City (Eg. Varachha, Surat)"
          style={styles.input}
          value={manLocation}
          onChangeText={(text) => manLocation(text)}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={Post}>
        <Text style={{ fontWeight: "bold", color: "#fff" }}>Post a Ad</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 70,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "#fff",
    borderColor: "rgba(0,0,0,0.1)",
  },
  input: {
    height: 50,
    backgroundColor: "#e9eff4",
    marginBottom: 25,
    // borderRadius: 10,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  or: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#2abe6c",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    margin: 10,
    marginBottom: 20,
  },
});
