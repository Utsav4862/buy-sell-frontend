import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GetCurrentLocation from "../Functions/Location";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { InfoState } from "../Context/InfoProvider";
import { Categories } from "../data/categoryData";
import axios from "axios";
import { URL } from "../API/api";
import { getTkn } from "../Functions/token";
import { SearchBar } from "react-native-screens";
import { sellDetailState } from "../Context/SellDetailProvider";

const Home = ({ navigation }) => {
  const { currLocation, setCurrLocation, cat, setCat } = InfoState();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = () => {
    GetCurrentLocation().then((res) => {
      setCurrLocation(res);
      console.log(res);
    });
  };

  const selectCat = (cat) => {
    setCat(cat.name);
    console.log(cat.id);
    navigation.navigate("Search", {
      cat: cat.name,
    });
  };
  const getAllProducts = () => {
    setIsLoading(true);
    getTkn().then((tkn) => {
      let config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tkn}`,
        },
      };
      axios.get(`${URL}/product/all`, config).then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    getLocation();
    getAllProducts();
    setCat("");
  }, []);
  return (
    <View
      style={[
        styles.mainContainer,
        isLoading
          ? { backgroundColor: "#fafafa", opacity: 0.3 }
          : { opacity: 1 },
      ]}
    >
      {isLoading ? (
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: "50%",
            left: "45%",
            zIndex: 2,
          }}
        >
          {isLoading && (
            <ActivityIndicator color={"rgb(40, 140, 34)"} size="large" />
          )}
        </View>
      ) : (
        ""
      )}
      <View style={styles.location}>
        <TouchableOpacity style={{}}>
          <Text style={styles.locText}>
            <Ionicons name="location" size={18} />
            {!currLocation
              ? " Loading..."
              : ` ${currLocation.district}, ${currLocation.city}`}
          </Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Search")}>
          <Ionicons
            name="search"
            size={25}
            style={{ marginRight: 20, fontWeight: "bold" }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.innerWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <SearchBar platform="android" placeholder="From" lightTheme /> */}

          <View style={styles.categoryContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 15 }}>
              What are you looking for?
            </Text>
            <ScrollView
              horizontal={true}
              style={{ width: "100%" }}
              contentContainerStyle={styles.categories}
              showsHorizontalScrollIndicator={false}
            >
              {Categories.map((cat) => (
                <TouchableWithoutFeedback
                  key={cat.id}
                  onPress={() => selectCat(cat)}
                >
                  <View style={styles.singleCat}>
                    <Image source={cat.img} style={{ width: 50, height: 50 }} />
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        marginTop: 5,
                      }}
                    >
                      {cat.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </ScrollView>
          </View>

          <View style={styles.products}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 15 }}>
              All Products
            </Text>

            <View style={styles.cardContainer}>
              {products.map((prod) => (
                <TouchableHighlight
                  onPress={() => console.log(prod.title)}
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
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
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

  singleCat: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
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
