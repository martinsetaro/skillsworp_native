import { StyleSheet, Platform } from "react-native";
import { colors } from "./colors";

export const chatStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
    width: "100%",
  },
  touchableWrapper: {
    flex: 1,
    width: "100%",
  },
  chatContent: {
    flex: 1,
    justifyContent: "space-between",
    padding: Platform.OS === "ios" ? 30 : 20,
    height: "100%",
  },
  chatWrapper: {
    alignItems: "flex-end",
    flexDirection: "row",
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  generarMessageWrapper: {
    width: "100%",
  },
  messageMineWrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
  },
  textMine: {
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    color: colors.backgroundPrimary,
    height: "auto",
    fontFamily: "quicksand_regular",
    fontSize: Platform.OS === "ios" ? 16 : 14,
    maxWidth: "70%",
    overflow: "hidden",
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "auto",
  },
  messageOtherWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
  },
  textOther: {
    backgroundColor: colors.backgroundThird,
    borderRadius: 10,
    color: colors.backgroundPrimary,
    height: "auto",
    fontFamily: "quicksand_regular",
    fontSize: Platform.OS === "ios" ? 16 : 14,
    maxWidth: "70%",
    overflow: "hidden",
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "auto",
  },
});
