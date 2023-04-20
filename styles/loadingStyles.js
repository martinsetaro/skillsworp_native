import { StyleSheet, Platform } from "react-native";
import { colors } from "./colors";

export const loadingStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    justifyContent: "center",
  },
  imgWrapper: {
    height: "35%",
    width: Platform.OS == "android" ? "40%" : "35%",
  },
  logo: {
    height: "100%",
    width: "100%",
  },
});
