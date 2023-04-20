import { StyleSheet, Platform } from "react-native";
import { colors } from "./colors";

export const modalStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundModal,
    flex: 1,
    justifyContent: "space-evenly",
    opacity: 0.9,
    padding: 30,
  },
  titleWrapper: {
    alignItems: "center",
  },
  imagesWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "6%",
  },
  image: {
    borderRadius: 100,
    height: 100,
    overflow: "hidden",
    width: 100,
  },
  buttonsWrapper: {},
});
