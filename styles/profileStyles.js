import { StyleSheet, Platform } from "react-native";
import { colors } from "./colors";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  shapeWrapper: {
    height: "18%",
    width: "100%",
  },
  shape: {
    height: "100%",
    width: "100%",
  },
  profileInfoWrapper: {
    backgroundColor: "transparent",
    height: "82%",
    justifyContent: "space-between",
    padding: Platform.OS === "ios" ? 30 : 20,
    width: "100%",
  },
  profileInfo: {
    width: "100%",
  },
  logOutWrapper: {
    width: "100%",
  },
  logoFooter: {
    alignSelf: "center",
    height: 40,
    width: 80,
  },
  imagePickerWrapper: {
    height: 150,
    marginBottom: "2%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: 150,
  },
  imagePickerView: {
    borderRadius: 150,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
  },
  addImageIconContainer: {
    alignItems: "center",
    backgroundColor: colors.primaryColor,
    borderRadius: 30,
    bottom: 0,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    right: "5%",
    width: 40,
  },
  cityWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },

  profileInfoSection: {
    marginBottom: Platform.OS === "ios" ? "8%" : "5%",
    width: "100%",
  },
});
