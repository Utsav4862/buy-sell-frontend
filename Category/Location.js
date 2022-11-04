import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { InfoState } from "../Context/InfoProvider";
import { Ionicons } from "@expo/vector-icons";
import { sellDetailState } from "../Context/SellDetailProvider";
import axios from "axios";
import { URL } from "../API/api";
import { getTkn } from "../Functions/token";
import GetCurrentLocation from "../Functions/Location";
import { Alert } from "react-native";
import { Linking } from "react-native";
import Loader from "../Components/Loader";
import { addProd } from "../API/productApi";
import { Err } from "../Functions/Error";

const Location = ({ route, navigation }) => {
  const { currLocation, setCurrLocation, per, setPer } = InfoState();
  const {
    category,
    brand,
    model,
    year,
    km,
    title,
    desc,
    images,
    price,
    subCat,
    location,
    setLocation,
  } = sellDetailState();
  const [manLocation, setManLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (manLocation == "" && currLocation) {
      let tempLoc = `${currLocation.district}, ${currLocation.city}`;
      console.log(tempLoc, "temp");
      setLocation(tempLoc);
    }
  }, [manLocation]);

  const createFormData = (body = {}) => {
    let formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      // console.log(image);
      formData.append("files", {
        name: new Date() + "_profile",
        uri: image.uri,
        type: "image/jpg",
      });
    }

    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });

    return formData;
  };

  const Post = async () => {
    if (location == "") {
      Alert.alert("Oops", "Select Location");
      return;
    }
    setIsLoading(true);

    let body = {
      category,
      brand,
      model,
      year,
      km,
      title,
      desc,
      price,
      subCat,
      location,
    };
    let data = await createFormData(body);
    try {
      getTkn().then(async (tkn) => {
        console.log(location);
        let config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${tkn}`,
          },
        };
        let resp = await addProd(data, config);
        console.log(resp);
        setIsLoading(false);
        Alert.alert("Congratulations!!", "Your ad has been posted", [
          { text: "ok", onPress: () => navigation.navigate("Home") },
        ]);
      });
    } catch (error) {
      console.log(error);
      Err();
    }
  };
  const getLocation = () => {
    GetCurrentLocation().then((res) => {
      console.log(res);
      if (res.status == false) {
        setPer(false);
        return;
      }
      setPer(true);
      setCurrLocation(res);
      setLocation(`${res.district},${res.city}`);
    });
  };
  const locAfterDenied = () => {
    console.log(per);
    if (!per) {
      Alert.alert(
        "Permission",
        "Please Give a Location Permissions from App Settings",
        [
          {
            text: "Not now",
          },
          {
            text: "Go to Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    } else {
      getLocation();
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <View style={[styles.mainContainer, isLoading ? { opacity: 0.5 } : ""]}>
      <TouchableOpacity style={styles.card} onPress={locAfterDenied}>
        <View style={styles.cardDetails}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
            Your Current Location (Default)
          </Text>

          <Text style={{ fontWeight: "700", width: "100%", color: "#1d9bf0" }}>
            <Ionicons name="location" size={15} />
            {currLocation != undefined && per == true
              ? `${currLocation.district},${currLocation.city}`
              : "Select current Location"}
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
          onChangeText={(text) => {
            setManLocation(text);
            setLocation(text);
          }}
        />
      </View>
      <TouchableOpacity disabled={isLoading} style={styles.btn} onPress={Post}>
        <Text style={{ fontWeight: "bold", color: "#fff" }}>Post a Ad</Text>
      </TouchableOpacity>
      {isLoading ? <Loader /> : ""}
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
