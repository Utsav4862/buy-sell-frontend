import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { InfoState } from "../Context/InfoProvider";
import { Avatar } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import ProductView from "../Components/ProductView";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { myProd } from "../API/productApi";
import { Err } from "../Functions/Error";
import { getTkn } from "../Functions/token";
import { updateImage } from "../API/userApi";
import * as ImagePicker from "expo-image-picker";

const Profile = ({ navigation }) => {
  const { user } = InfoState();
  const [image, setImage] = useState(user.profile_img);
  const [products, setProducts] = useState([]);

  const myProducts = async () => {
    try {
      let data = await myProd();
      setProducts(data);
    } catch (error) {
      console.log(error);
      Err();
    }
  };

  const changeImage = async () => {
    const formData = new FormData();
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status != "granted") {
      return;
    }
    if (status == "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        console.log(response);
        formData.append("files", {
          name: new Date() + "_profile",
          uri: response.uri,
          type: "image/jpg",
        });

        uploadImage(formData);
      }
    }
  };

  const uploadImage = async (data) => {
    try {
      getTkn()
        .then(async (tkn) => {
          let config = {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${tkn}`,
            },
          };
          let resp = await updateImage(data, config);
          console.log(resp);
          setImage(resp);
        })
        .catch((err) => {
          console.log(err);
          Err();
        });
    } catch (error) {
      console.log(error);
      Err();
    }
  };

  useFocusEffect(
    useCallback(() => {
      myProducts();
    }, [])
  );
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView style={styles.innerWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Account</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ justifyContent: "center", margin: 10 }}>
            <TouchableHighlight style={styles.cardWrapper}>
              <View style={styles.card}>
                <View style={styles.profileImg}>
                  <Avatar source={{ uri: image }} rounded size={90} />
                </View>
                <View style={styles.detail}>
                  <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    {user.name}
                  </Text>
                  <TouchableOpacity onPress={changeImage}>
                    <Text
                      style={{
                        color: "#1d9bf0",
                      }}
                    >
                      <MaterialCommunityIcons name="image" /> change photo
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.products}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 15 }}>
              All Ads
            </Text>
            <ProductView
              products={products}
              setProducts={setProducts}
              navigation={navigation}
              user={user}
              flag={true}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  innerWrapper: {
    margin: 10,
    marginTop: 0,
    marginBottom: 65,
    // paddingBottom: 15,
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
  },
  headerTxt: {
    fontSize: 35,
    fontWeight: "bold",
  },

  cardWrapper: {
    width: "100%",
    height: 150,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "gray",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
  },
  profileImg: {
    width: "30%",
    height: "120%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  detail: {
    width: "70%",
    marginLeft: 20,
    height: "100%",
    justifyContent: "center",
  },
  products: {},
});
