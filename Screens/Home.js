import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import GetCurrentLocation from "../Functions/Location";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { InfoState } from "../Context/InfoProvider";
import { Categories } from "../data/categoryData";
import axios from "axios";
import { URL } from "../API/api";
import { getTkn } from "../Functions/token";
import ProductView from "../Components/ProductView";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { loggedUser } from "../API/userApi";
import { Err } from "../Functions/Error";
import { fetchProducts } from "../API/productApi";
// import {} from "react-native-permission"
const Home = ({ navigation }) => {
  const {
    currLocation,
    setCurrLocation,
    notifications,
    setCat,
    setUser,
    user,
    per,
    setPer,
  } = InfoState();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // const [] = useState(true);

  const getLocation = () => {
    GetCurrentLocation().then((res) => {
      if (res.status == false) {
        setPer(false);
        return;
      }
      setCurrLocation(res);
      setPer(true);
      console.log(res);
    });
  };

  const getLoggedUser = async () => {
    try {
      getTkn().then(async (tkn) => {
        let data = await loggedUser(tkn);

        setUser(data);
      });
    } catch (error) {
      Err();
    }
  };

  const selectCat = (cat) => {
    setCat(cat.name);
    console.log(cat.id);
    navigation.navigate("Search", {
      cat: cat.name,
    });
  };
  const getAllProducts = async () => {
    setRefreshing(true);
    try {
      let data = await fetchProducts();

      setProducts(data);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      Err();
    }
  };

  const locAfterDenied = () => {
    if (!per) {
      Alert.alert(
        "Permission",
        "Please Give a Location Permissions from app Settings",
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
    getLoggedUser();
    getLocation();
    setCat("");
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAllProducts();
    }, [])
  );
  useEffect(() => {
    console.log(notifications.length);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.location}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={locAfterDenied}
        >
          <Ionicons name="location" size={18} color={"#bf8801"} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Location</Text>
            <Text style={styles.locText}>
              {!per || !currLocation
                ? "Select your Location"
                : `${currLocation.district}, ${currLocation.city}`}
            </Text>
          </View>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getAllProducts && getLocation}
              colors={["rgb(40, 140, 34)", "#bf8801"]}
              tintColor={"#bf8801"}
            />
          }
        >
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
              All Ads
            </Text>
            <ProductView
              products={products}
              setProducts={setProducts}
              navigation={navigation}
              user={user}
              refreshing={refreshing}
            />
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
    height: 100,
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
    color: "gray",
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
