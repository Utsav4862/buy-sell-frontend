import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import ImageSlider from "../Components/ImageSlider";
import { sellDetailState } from "../Context/SellDetailProvider";
import { Modal } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

const Images = ({ route, navigation }) => {
  const { images, setImages } = sellDetailState();
  const [modal, setModal] = useState(false);
  let CameraRef = useRef();

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
          setModal(false);
        } else {
          setImages([response]);
          setModal(false);
        }
      }
    }
  };

  const imageCapture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    console.log(status);

    console.log(status);
    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        allowsMultipleSelection: true,
      });
      console.log(response);
      if (response.cancelled) {
        return;
      }
      if (!response.cancelled) {
        console.log(typeof response);

        setImages([response]);
        setModal(false);
      }
    }
  };
  return (
    <View
      style={[
        styles.main,
        modal ? { opacity: 0.5, backgroundColor: "#000" } : "",
      ]}
    >
      <View style={[styles.mainContainer]}>
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
        <TouchableOpacity style={styles.btn} onPress={() => setModal(true)}>
          <Text style={{ fontWeight: "bold", color: "#fff" }}>
            Select Images
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => next("Price")}>
          <Text style={{ fontWeight: "bold", color: "#fff" }}>Next</Text>
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 20,
            // marginBottom: 10,
            color: "#2abe6c",
            fontWeight: "bold",
          }}
        >
          Multiple Images are allowed*
        </Text>
        <Modal visible={modal} transparent={true} animationType="slide">
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => setModal(false)}
              >
                <Entypo name="circle-with-cross" size={25} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn} onPress={imageCapture}>
                <Ionicons name="camera" size={60} color="#1d9bf0" />
                <Text style={styles.modalTxt}>Capture Images</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn} onPress={uploadImage}>
                <Entypo name="folder-images" size={60} color="#1d9bf0" />
                <Text style={styles.modalTxt}>Upload from Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    marginBottom: 120,
    flex: 1,
  },
  header: {
    fontSize: 10,
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

  modal: {
    flex: 1,
    // backgroundColor: "red",
  },

  modalContent: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 2,
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    flex: 1,
  },
  modalBtn: {
    // height: 50,
    width: "50%",
    alignItems: "center",
  },

  modalTxt: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  cancel: {
    position: "absolute",
    bottom: 170,
    left: 7,
  },
});
