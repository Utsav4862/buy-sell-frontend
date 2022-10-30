import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import ImageSlider from "../Components/ImageSlider";
import { sellDetailState } from "../Context/SellDetailProvider";

const Images = ({ route, navigation }) => {
  const { images, setImages } = sellDetailState();

  const next = (nav) => {
    if (images.length == 0) {
      Alert.alert("Oops", "Please Upload at least one photo ");
      return;
    }
    navigation.navigate(nav);
  };

  useEffect(() => {
    setImages([]);
  }, []);

  const uploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status != "granted") {
      Alert.alert("Error");
      return;
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
      });
      if (response.cancelled) {
        return;
      }
      if (!response.cancelled) {
        console.log(typeof response);
        if (response.selected != undefined) {
          setImages(response.selected);
          console.log(response.selected);
        } else {
          setImages([response]);
        }
      }
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.mainContainer}>
        <Text
          style={{
            marginTop: -20,
            marginLeft: 20,
            marginBottom: 10,
            color: "#2abe6c",
            fontWeight: "bold",
          }}
        >
          Multiple Images are allowed*
        </Text>
        <View style={styles.img}>
          {images.length > 1 ? (
            <View style={{ width: "100%", height: 300 }}>
              <ImageSlider imageData={images} />
            </View>
          ) : images.length == 1 ? (
            <Image
              source={{ uri: images[0].uri }}
              style={{ width: "90%", height: 300, resizeMode: "contain" }}
            />
          ) : (
            <Image
              source={require("../assets/Images/placeholder.png")}
              style={{ width: "90%", height: 300 }}
            />
          )}
        </View>
        <TouchableOpacity style={styles.btn} onPress={uploadImage}>
          <Text style={{ fontWeight: "bold", color: "#fff" }}>
            Select Images
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => next("Price")}>
          <Text style={{ fontWeight: "bold", color: "#fff" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 50,
    marginBottom: 120,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#2abe6c",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    margin: 10,
  },
  img: {
    width: "100%",
    height: 300,
    alignItems: "center",
  },
});
