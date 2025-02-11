import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImageSlider from "../Components/ImageSlider";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { getTkn } from "../Functions/token";
import axios from "axios";
import { URL } from "../API/api";
import { InfoState } from "../Context/InfoProvider";

const ProductScreen = ({ route, navigation }) => {
  const { user, setSelectedChat } = InfoState();
  const { product } = route.params;
  const [date, setDate] = useState();

  const chatWithSeller = () => {
    getTkn().then(async (tkn) => {
      let config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tkn}`,
        },
      };
      let body = {
        userId: product.user._id,
        productId: product._id,
      };
      let { data } = await axios.post(`${URL}/chat`, body, config);
      console.log(data);
      setSelectedChat(data);
      navigation.navigate("Message");
    });
  };
  useEffect(() => {
    console.log(product);
    let d = product.createdAt.split("-").reverse();
    d = d[0].slice(0, 2) + "-" + d[1] + "-" + d[2];
    setDate(d);
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 50, zIndex: 5, marginLeft: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={25} color={"gray"} />
      </TouchableOpacity>
      <ScrollView
        style={{ marginBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.img}>
          <ImageSlider imageData={product.images} />
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.commonRow}>
            <Text style={styles.commonTxt}>
              <Ionicons name="calendar" size={14} /> {date}
            </Text>
            <Text style={styles.commonTxt}>
              <Ionicons name="heart" size={14} />{" "}
              {product.likes ? product.likes.length : 0}
            </Text>
            <Text style={[styles.commonTxt, { maxWidth: "50%" }]}>
              <Ionicons name="location" size={14} /> {product.location}
            </Text>
          </View>
          <View>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.subCat}>
                {product.subCat ? product.subCat : product.category}
              </Text>
            </View>
            <Text style={styles.price}>
              <FontAwesome
                name="rupee"
                size={22}
                style={{ fontWeight: "900" }}
              />

              {product.price}
            </Text>
          </View>

          {product.category == "Car" ||
          product.category == "Bike" ||
          product.category == "Mobile" ? (
            <View style={styles.card}>
              <View style={styles.detail}>
                <Text style={styles.left}>Brand</Text>
                <Text style={styles.left}>Model</Text>
                <Text style={styles.left}>Year</Text>
                {product.category != "Mobile" ? (
                  <Text style={styles.left}>Kilometer</Text>
                ) : (
                  ""
                )}
              </View>
              <View style={styles.detail}>
                <Text style={styles.right}>{product.brand}</Text>
                <Text style={styles.right}>{product.model}</Text>
                <Text style={styles.right}>{product.year}</Text>
                {product.category != "Mobile" ? (
                  <Text style={styles.right}>{product.km}</Text>
                ) : (
                  ""
                )}
              </View>
            </View>
          ) : (
            ""
          )}
        </View>

        <View style={styles.desc}>
          <Text style={styles.descLable}>Description</Text>
          <Text style={styles.descTxt}>{product.desc}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <View
          style={{
            flexDirection: "row",
            width: "49%",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Image
            source={{ uri: product.user.profile_img }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />

          <Text
            style={{
              color: "#fff",
              marginLeft: 15,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {product.user.name}
          </Text>
        </View>
        <View
          style={{ height: "100%", width: "49%", justifyContent: "center" }}
        >
          {user._id !== product.user._id ? (
            <TouchableOpacity style={styles.btn} onPress={chatWithSeller}>
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
                <AntDesign name="message1" size={15} /> Chat with Seller
              </Text>
            </TouchableOpacity>
          ) : (
            ""
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  img: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  detailContainer: {
    margin: 15,
  },
  commonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // flexWrap: "wrap",
  },
  commonTxt: {
    fontSize: 14,
    color: "gray",
  },
  titleBox: {
    marginTop: 20,
  },
  subCat: {
    fontWeight: "bold",
    color: "#848482",
    marginTop: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#494848",
  },
  price: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "900",
  },
  card: {
    height: 135,
    backgroundColor: "#e9eff4",
    padding: 10,
    paddingRight: 100,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  detail: {
    justifyContent: "space-between",
  },

  desc: {
    margin: 15,
    marginLeft: 20,
    width: "100%",
  },
  descLable: {
    color: "gray",
    fontWeight: "700",
    fontSize: 18,
  },
  descTxt: {
    marginTop: 5,
    fontWeight: "700",
    marginRight: 8,
  },
  bottom: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    bottom: 0,
    height: 100,
    backgroundColor: "#263b55",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    padding: 20,
    alignItems: "space-between",
  },

  btn: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2abe6c",
    borderRadius: 10,
  },

  left: {
    fontWeight: "700",
    color: "gray",
  },
  right: {
    fontWeight: "700",
  },
});
