import { StyleSheet, Platform } from "react-native";
import { colors } from "./colors";

export const signInStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  shapeWrapper: {
    height: "25%",
    width: "100%",
  },
  shape: {
    height: "100%",
    width: "100%",
  },
  formWrapper: {
    justifyContent: "space-between",
    width: "100%",
    padding: 30,
  },
  linksSection: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "9%",
    width: "100%",
  },
  createAccountWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "3%",
    width: "100%",
  },
  linkSignUp: {
    alignItems: "center",
    color: colors.thirdColor,
    fontFamily: "quicksand_regular",
    fontSize: 14,
    justifyContent: "center",
  },
});
