import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

const ImageSlider = ({ imageData }) => {
  console.log(imageData[0]);
  return (
    <Swiper style={styles.wrapper} showsPagination={false} showsButtons={true}>
      {imageData.map((slide, index) => (
        <View style={styles.slide} key={index}>
          <Image
            source={{ uri: slide.uri }}
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
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    margin: 5,
    borderRadius: 10,
  },
});
