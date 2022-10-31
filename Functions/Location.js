import * as Location from "expo-location";
import { Alert } from "react-native";
const GetCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  console.log(status);
  if (status !== "granted") {
    Alert.alert(
      "Permission not granted",
      "Allow the app to use location service.",
      [{ text: "OK" }],
      { cancelable: true }
    );
    return { status: false };
  }

  let { coords } = await Location.getCurrentPositionAsync();

  if (coords) {
    const { latitude, longitude } = coords;
    let response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    // console.log(response[0]);

    return response[0];
  }
};

export default GetCurrentLocation;
