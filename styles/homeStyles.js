import { StyleSheet, Platform } from "react-native";
import { colors } from "./colors";

export const homeStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
    padding: 30,
  },
  cardSwipeWrapper: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
});
