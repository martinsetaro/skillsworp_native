import { StyleSheet, Platform } from "react-native";
import { colors } from "./colors";

export const chatsStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
    width: "100%",
  },
  contentWrapper: {
    padding: 30,
    width: "100%",
  },

  chatWrapper: {
    height: "100%",
    width: "100%",
  },
  sectionWrapper: {
    marginBottom: "8%",
    width: "100%",
  },
  matchWrapper: {
    borderRadius: 50,
    height: 100,
    marginRight: 15,
    width: 85,
  },
  matchRadius: {
    borderRadius: 12,
  },
  /*chats */
  chatsSection: {
    height: "70%",
    width: "100%",
  },
  pendingMessageWrapper: {
    alignItems: "center",
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 80,
    marginBottom: 15,
    width: "100%",
  },
  imageWrapper: {
    height: "100%",
    width: "20%",
  },
  imagePendMessage: {
    borderRadius: 65,
    height: 65,
    width: 65,
  },
  descMessageWrapper: {
    padding: 8,
    height: "100%",
    width: "80%",
  },
});
