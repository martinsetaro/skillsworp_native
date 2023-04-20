import { Alert } from "react-native";

export const DefaultAlert = (title, message) =>
  Alert.alert(title, message, [{ text: "OK" }]);
