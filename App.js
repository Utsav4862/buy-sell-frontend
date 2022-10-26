import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigation from "./Navigation/StackNavigation";
import { useFonts } from "expo-font";
import InfoProvider from "./Context/InfoProvider";

export default function App() {
  const [loaded] = useFonts({
    ProximaNova: require("./assets/Fonts/ProximaNova-Regular.otf"),
    ProximaNovaBold: require("./assets/Fonts/ProximaNova-Bold.otf"),
  });
  if (!loaded) {
    return null;
  }

  console.log(loaded);
  return (
    <InfoProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </InfoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
