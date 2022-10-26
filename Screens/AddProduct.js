import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Categories } from "../data/categoryData";

const AddProduct = ({ navigation }) => {
  const selection = (cat) => {
    navigation.navigate(cat.navigate, {
      category: cat.name,
    });
  };
  return (
    <View style={styles.main}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {" "}
            What are you Selling?{" "}
          </Text>
        </View>
        <View style={styles.cardContainer}>
          {Categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.card}
              onPress={() => selection(cat)}
            >
              <Image source={cat.img} style={{ width: 100, height: 100 }} />
              <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 15 }}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    margin: 10,
    backgroundColor: "#fff",
    marginTop: 45,
  },
  header: {
    marginTop: 20,

    marginLeft: 20,
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
    height: 180,
    width: "47%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
