import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { TouchableHighlight } from "react-native";
import { Image } from "react-native";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { delProd, likeUnlikeProd } from "../API/productApi";
import { Err } from "../Functions/Error";
import { InfoState } from "../Context/InfoProvider";

const ProductView = ({ products, navigation, setProducts, flag }) => {
  const { user } = InfoState();
  const likeUnlikeProduct = async (prod, i, value) => {
    try {
      let body = { productId: prod._id };
      let data = await likeUnlikeProd(value, body);
      let temp = [...products];
      temp[i] = data;
      setProducts(temp);
    } catch (error) {
      console.log(error);
      Err();
    }
  };

  const deleteProduct = async (productId, i) => {
    try {
      let data = await delProd(productId);
      let temp = products.filter((item) => item._id !== data._id);
      setProducts(temp);
    } catch (error) {
      console.log(error);
      Err();
    }
  };

  return (
    <View style={styles.cardContainer}>
      {products.map((prod, i) => (
        <TouchableHighlight
          onPress={() => navigation.navigate("Product", { product: prod })}
          underlayColor={"#f0f0f0"}
          style={styles.card}
          key={prod._id}
        >
          <View>
            <View style={styles.img}>
              <Image
                source={{
                  uri: prod.images[0],
                }}
                style={{
                  width: "90%",
                  height: 100,
                  resizeMode: "contain",
                }}
              />
              <TouchableOpacity
                style={{ position: "absolute", top: 10, right: 10 }}
                onPress={() =>
                  !prod.likes.includes(user._id)
                    ? likeUnlikeProduct(prod, i, "like")
                    : likeUnlikeProduct(prod, i, "unlike")
                }
              >
                <AntDesign
                  name={prod.likes.includes(user._id) ? "heart" : "hearto"}
                  size={20}
                  color={prod.likes.includes(user._id) ? "red" : "black"}
                />
              </TouchableOpacity>
              {flag == true ? (
                <TouchableOpacity
                  style={styles.delete}
                  onPress={() => deleteProduct(prod._id, i)}
                >
                  <MaterialIcons name="delete" size={25} color="#1d9bf0" />
                </TouchableOpacity>
              ) : (
                ""
              )}
            </View>
            <View style={styles.cardDetails}>
              <Text>{prod.title}</Text>
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 5,
                  fontWeight: "bold",
                }}
              >
                <FontAwesome name="rupee" size={15} /> {prod.price}
              </Text>
              {prod.category == "Car" || prod.category == "Bike" ? (
                <Text style={{ marginTop: 5 }}>
                  {prod.year} - {prod.km} km
                </Text>
              ) : (
                ""
              )}
              <Text
                style={{
                  color: "gray",
                  position: "absolute",
                  bottom: 5,
                }}
              >
                <Ionicons name="location" size={12} />{" "}
                {prod.location.length > 15
                  ? prod.location.slice(0, 15) + "..."
                  : prod.location}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  products: {
    marginTop: 20,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 10,
    justifyContent: "space-between",
  },

  card: {
    margin: 5,
    height: 200,
    width: "47%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",

    borderRadius: 10,
  },

  img: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  cardDetails: {
    marginLeft: 10,
    height: "50%",
    width: "90%",
  },
  delete: {
    position: "absolute",
    top: 5,
    left: 5,
  },
});
