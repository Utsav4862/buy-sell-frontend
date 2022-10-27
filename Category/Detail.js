import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { CarData } from "../data/CarData";
import { BikeData } from "../data/BikeData";
import { MobileData } from "../data/MobileData";
import { sellDetailState } from "../Context/SellDetailProvider";

const Details = ({ route, navigation }) => {
  // const [brand, setBrand] = useState("");
  // const [model, setModel] = useState("");
  // const [year, setYear] = useState();
  // const [km, setKm] = useState();
  // const [title, setTitle] = useState("");
  // const [desc, setDesc] = useState("");

  const {
    category,
    setCategory,
    brand,
    setBrand,
    model,
    setModel,
    year,
    setYear,
    km,
    setKm,
    title,
    setTitle,
    desc,
    setDesc,
  } = sellDetailState();

  const [flag, setFlag] = useState(0);
  // const { category, setDetail } = sellDetailState();
  console.log(category);
  const next = (nav) => {
    navigation.navigate(nav);
  };

  useEffect(() => {
    if (category == "Car") {
      setFlag(0);
    } else if (category == "Bike") {
      setFlag(1);
    } else if (category == "Mobile") {
      setFlag(2);
    } else setFlag(3);
    setBrand("");
    setDesc("");
    setKm();
    setYear();
    setTitle("");
    setModel("");
    navigation.setOptions({ title: category });
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.mainContainer}>
        <Text style={styles.header}>Add Details</Text>
        <ScrollView style={styles.Form} showsVerticalScrollIndicator={false}>
          {flag != 3 ? (
            <>
              <View style={styles.input}>
                <Picker
                  selectedValue={brand}
                  onValueChange={(val, idx) => setBrand(val)}
                >
                  <Picker.Item value="" label="Brand" />
                  {flag == 0
                    ? CarData.map((item) => (
                        <Picker.Item
                          key={item.id}
                          value={item.brand}
                          label={item.brand}
                        />
                      ))
                    : flag == 1
                    ? BikeData.map((item) => (
                        <Picker.Item
                          key={item.id}
                          value={item.brand}
                          label={item.brand}
                        />
                      ))
                    : MobileData.map((item) => (
                        <Picker.Item
                          key={item.id}
                          value={item.brand}
                          label={item.brand}
                        />
                      ))}
                </Picker>
              </View>
              <TextInput
                style={styles.input}
                placeholder={"Model*"}
                value={model}
                onChangeText={(text) => setModel(text)}
              />
              <TextInput
                style={styles.input}
                placeholder={"Year*"}
                value={year}
                onChangeText={(text) => setYear(text)}
              />
            </>
          ) : (
            ""
          )}
          {flag == 0 || flag == 1 ? (
            <TextInput
              style={styles.input}
              placeholder={"KM Driven*"}
              value={km}
              onChangeText={(text) => setKm(text)}
            />
          ) : (
            ""
          )}
          <TextInput
            style={styles.input}
            placeholder={"Ad Title*"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder={"Describe what are you selling*"}
            value={desc}
            onChangeText={(text) => setDesc(text)}
          />
          <TouchableOpacity style={styles.btn} onPress={() => next("Image")}>
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 20,
  },

  input: {
    height: 50,
    backgroundColor: "#e9eff4",
    marginBottom: 25,
    // borderRadius: 10,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    // elevation: 1,
  },
  Form: {
    marginBottom: 25,
  },
  btn: {
    backgroundColor: "#2abe6c",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    margin: 10,
    marginBottom: 20,
  },
});
