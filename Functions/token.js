import * as SecureStore from "expo-secure-store";
export const getTkn = async () => {
  let tkn = await SecureStore.getItemAsync("TOKEN");
  return tkn;
};
