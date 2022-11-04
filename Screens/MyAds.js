import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTkn } from "../Functions/token";
import axios from "axios";
import { URL } from "../API/api";
import { ScrollView } from "react-native-gesture-handler";
import ProductView from "../Components/ProductView";
import { InfoState } from "../Context/InfoProvider";
import { useFocusEffect } from "@react-navigation/native";
import { Err } from "../Functions/Error";

const MyAds = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { user } = InfoState();
  const [isLoading, setIsLoading] = useState(false);

  const getLikedProducts = () => {
    try {
      getTkn()
        .then(async (tkn) => {
          let config = {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${tkn}`,
            },
          };
          let { data } = await axios.get(`${URL}/product/likedProd`, config);
          setProducts(data);
        })
        .catch((err) => {
          setIsLoading(false);
          Err();
        });
    } catch (error) {
      setIsLoading(false);
      Err();
    }
  };
  useEffect(() => {}, []);
  useFocusEffect(
    useCallback(() => {
      getLikedProducts();
    }, [])
  );
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView style={{ marginBottom: 65 }}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Your Liked Ads</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.products}>
            <ProductView
              products={products}
              setProducts={setProducts}
              navigation={navigation}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MyAds;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  headerTxt: {
    fontSize: 32,
    fontWeight: "bold",
  },

  innerWrapper: {
    margin: 10,
    marginTop: 0,
    marginBottom: 85,
    paddingBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#e9eff4",
    height: 50,
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },
  location: {
    width: "100%",
    backgroundColor: "#fff",
    elevation: 1.5,
    height: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 50,
    paddingLeft: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  locText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    marginLeft: 7,
    width: "100%",
  },

  categoryContainer: {
    marginTop: 15,
  },

  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  products: {
    // marginTop: 20,
    margin: 10,
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
    height: 250,
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
    // justifyContent: "space-around",
  },
});
