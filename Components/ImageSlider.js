import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

const ImageSlider = ({ imageData }) => {
  console.log(imageData[0]);
  return (
    <Swiper
      showsPagination={false}
      showsButtons={true}
      contentContainerStyle={{
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      {imageData.map((slide, index) => (
        <View style={styles.slide} key={index}>
          <Image
            source={{ uri: slide.uri ? slide.uri : slide }}
            style={{
              width: 300,
              height: 200,
              resizeMode: "contain",
            }}
          />
        </View>
      ))}
    </Swiper>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  // wrapper:{
  //   borderb
  // },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eff4f2",
    width: "100%",
    // borderRadius: 20,
  },
});
