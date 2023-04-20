import { Platform, StyleSheet } from "react-native";
import { colors } from "./colors";

export const welcomeStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    justifyContent: "space-around",
    padding: 30,
  },
  imgWrapper: {
    height: "35%",
    width: "45%",
  },
  logo: {
    height: "100%",
    width: "100%",
  },
  btnSection: {
    width: "100%",
  },
});
