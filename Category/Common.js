import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ElectronicsData } from "../data/ElectronicsData";
import { sellDetailState } from "../Context/SellDetailProvider";
import { LifeStyleData } from "../data/LifeStyleData";
import { InfoState } from "../Context/InfoProvider";

const Electronics = ({ navigation, route }) => {
  const [flag, setFlag] = useState(true);
  const { category, setSubCat } = sellDetailState();
  const { cat, setCat } = InfoState();
  const selection = (value) => {
    if (cat) {
    }
    setSubCat(value);
    navigation.navigate("Detail");
  };

  useEffect(() => {
    if (category == "Lifestyle" || cat == "Lifestyle") setFlag(false);
    else setFlag(true);

    navigation.setOptions({ title: category });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={flag ? ElectronicsData : LifeStyleData}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => selection(item.label)}
            style={styles.item}
            underlayColor={"#f0f0f0"}
          >
            <Text>{item.label}</Text>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default Electronics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    width: "100%",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    paddingLeft: 15,
  },
});
