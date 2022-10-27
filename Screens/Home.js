import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GetCurrentLocation from "../Functions/Location";
import { Ionicons } from "@expo/vector-icons";
import { InfoState } from "../Context/InfoProvider";
import { Categories } from "../data/categoryData";

const Home = () => {
  const { currLocation, setCurrLocation } = InfoState();
  const [search, setSearch] = useState();

  const getLocation = () => {
    GetCurrentLocation().then((res) => {
      setCurrLocation(res);
      console.log(res);
    });
  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerWrapper}>
        <TouchableOpacity style={styles.location}>
          <Text style={styles.locText}>
            <Ionicons name="location" size={18} />
            {!currLocation
              ? " Loading..."
              : ` ${currLocation.district}, ${currLocation.city}`}
          </Text>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} />
            <TextInput
              style={styles.input}
              placeholder={"Search for Products..."}
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </View>

          <View style={styles.categoryContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 15 }}>
              What are you looking for?
            </Text>
            <ScrollView
              horizontal={true}
              style={{ width: "100%" }}
              contentContainerStyle={styles.categories}
            >
              {Categories.map((cat) => (
                <View key={cat.id} style={styles.singleCat}>
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
              ))}
            </ScrollView>
          </View>

          <View style={styles.products}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 15 }}>
              All Products
            </Text>

            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={styles.img}>
                  <Image
                    source={{
                      uri: "https://m.media-amazon.com/images/I/81XyIoZ8+HL._SL1500_.jpg",
                    }}
                    style={{
                      width: "90%",
                      height: 100,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View style={styles.cardDetails}>
                  <Text>Title</Text>
                  <Text>15,000</Text>
                  <Text>Test 2</Text>
                  <Text>Category</Text>
                </View>
              </View>
              <View style={styles.card}>
                <View style={styles.img}>
                  <Image
                    source={{
                      uri: "https://m.media-amazon.com/images/I/81XyIoZ8+HL._SL1500_.jpg",
                    }}
                    style={{
                      width: "90%",
                      height: 100,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View style={styles.cardDetails}>
                  <Text>Title</Text>
                  <Text>15,000</Text>
                  <Text>Test 2</Text>
                  <Text>Category</Text>
                </View>
              </View>
              <View style={styles.card}>
                <View style={styles.img}>
                  <Image
                    source={{
                      uri: "https://m.media-amazon.com/images/I/81XyIoZ8+HL._SL1500_.jpg",
                    }}
                    style={{
                      width: "90%",
                      height: 100,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View style={styles.cardDetails}>
                  <Text>Title</Text>
                  <Text>15,000</Text>
                  <Text>Test 2</Text>
                  <Text>Category</Text>
                </View>
              </View>
              <View style={styles.card}>
                <View style={styles.img}>
                  <Image
                    source={{
                      uri: "https://m.media-amazon.com/images/I/81XyIoZ8+HL._SL1500_.jpg",
                    }}
                    style={{
                      width: "90%",
                      height: 100,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View style={styles.cardDetails}>
                  <Text>Title</Text>
                  <Text>15,000</Text>
                  <Text>Test 2</Text>
                  <Text>Category</Text>
                </View>
              </View>
              <View style={styles.card}>
                <View style={styles.img}>
                  <Image
                    source={{
                      uri: "https://m.media-amazon.com/images/I/81XyIoZ8+HL._SL1500_.jpg",
                    }}
                    style={{
                      width: "90%",
                      height: 100,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View style={styles.cardDetails}>
                  <Text>Title</Text>
                  <Text>15,000</Text>
                  <Text>Test 2</Text>
                  <Text>Category</Text>
                </View>
              </View>
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
    height: 85,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 50,
    paddingLeft: 15,
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
    height: 200,
    width: "47%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",

    borderRadius: 10,
  },

  img: {
    height: "50%",
    width: "90%",
    alignItems: "center",
  },

  cardDetails: {
    marginLeft: 10,
    height: "50%",
    width: "90%",
    justifyContent: "space-around",
  },
});
