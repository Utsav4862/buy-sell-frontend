import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { URL } from "../API/api";
import { getTkn } from "../Functions/token";
import { TabRouter } from "@react-navigation/native";
import { InfoState } from "../Context/InfoProvider";
import { Alert } from "react-native";
import Loader from "../Components/Loader";
import { searchProd } from "../API/productApi";
import { Err } from "../Functions/Error";

const Search = ({ route, navigation }) => {
  const { currLocation } = InfoState();
  const [search, setSearch] = useState("");
  const [flag, setFlag] = useState(false);
  const [focus, setFocus] = useState(false);
  const [focus2, setFocus2] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [loc, setLoc] = useState(
    currLocation.district + ", " + currLocation.city
  );
  const input = useRef();
  const [searchProducts, setSearchProducts] = useState([]);
  let location;
  const searchItems = async () => {
    if (search == "") return;
    setIsLoading(true);
    try {
      let data = await searchProd(search, loc);
      console.log(data, "data");
      setSearchProducts(data);
      setFlag(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Err();
    }
  };

  useEffect(() => {
    console.log(search);
    if (!focus && !focus2) searchItems();
  }, [search]);
  useEffect(() => {
    console.log(flag);
  }, [flag]);

  useEffect(() => {
    if (route.params) {
      const { cat } = route.params;
      setSearch(cat);
      setFocus(false);
      setFocus2(false);
    } else {
      setFlag(false);
      setSearch("");
      setFocus(true);
    }
    location = currLocation.city;
    console.log(location);
  }, []);
  return (
    <View style={styles.container}>
      {isLoading ? <Loader /> : ""}
      <SafeAreaView style={{ marginBottom: 105 }}>
        <View
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              minWidth: "100%",
              height: 50,
            }}
          >
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={15}
                style={{ fontWeight: "bold", marginRight: 10 }}
              />
              <TextInput
                autoFocus={focus}
                placeholder="Search"
                style={styles.input}
                value={search}
                onChangeText={(text) => setSearch(text)}
                onBlur={searchItems}
                returnKeyType="search"
                onFocus={() => setFocus(true)}
              />
            </View>
          </View>
          <View
            style={[
              styles.searchContainer,
              { marginLeft: 45, marginTop: 5, marginBottom: 10 },
            ]}
          >
            <Ionicons
              name="location"
              size={15}
              style={{ fontWeight: "bold", marginRight: 10 }}
            />
            <TextInput
              defaultValue={currLocation.district + ", " + currLocation.city}
              style={styles.input}
              value={loc}
              onChangeText={(text) => setLoc(text)}
              onBlur={searchItems}
              returnKeyType="search"
              onFocus={() => setFocus2(true)}
            />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultContainer}
        >
          {flag && !focus && !focus2 ? (
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {searchProducts.length} result found in {loc}
              </Text>
              <View style={styles.cardContainer}>
                {searchProducts.map((prod) => (
                  <TouchableHighlight
                    onPress={() =>
                      navigation.navigate("Product", { product: prod })
                    }
                    style={styles.card}
                    underlayColor={"#f0f0f0"}
                    key={prod._id}
                  >
                    <View
                      style={
                        ([styles.card], { width: "100%", flexDirection: "row" })
                      }
                    >
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
                        <Text style={{ fontSize: 15 }}>{prod.title}</Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                          <FontAwesome name="rupee" size={15} /> {prod.price}
                        </Text>
                        {prod.category == "Car" || prod.category == "Bike" ? (
                          <View>
                            <Text style={{ fontSize: 15 }}>
                              {prod.year} - {prod.km} km
                            </Text>
                          </View>
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
          ) : (
            ""
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },

  input: {
    height: 40,
    backgroundColor: "#f0f0f0",
    width: "90%",
  },

  searchContainer: {
    flexDirection: "row",
    width: "85%",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    height: 40,
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
  },
  resultContainer: {
    margin: 20,
    paddingBottom: 20,
    // height: "100%",
  },
  cardContainer: {
    flexDirection: "column",
    width: "100%",
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },

  card: {
    margin: 5,
    height: 150,
    width: "95%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",

    borderRadius: 10,
  },

  img: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  cardDetails: {
    // justifyContent: "center",
    marginLeft: 10,
    marginTop: 20,
    height: "100%",
    width: "50%",
  },
});
