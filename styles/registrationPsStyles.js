import { StyleSheet, Platform } from "react-native";
import { colors } from "./colors";

export const registrationPsStyles = StyleSheet.create({
  touchableWrapper: {
    flex: 1,
    width: "100%",
  },
  containerRecover: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    padding: 30,
    width: "100%",
  },
  contentRecoverWrapper: {
    flex: 1,
    justifyContent: "space-evenly",
    width: "100%",
  },
  textRecoverWrapper: {
    width: "100%",
  },
  iconRecoverWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    width: "100%",
  },

  /* CODE CONFIRMATION */
  containerConfirm: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    padding: 30,
    width: "100%",
  },
  contentConfirmWrapper: {
    flex: 1,
    justifyContent: "space-around",
    width: "100%",
  },
  confirmationImage: {
    alignSelf: "center",
  },
  iconConfirmWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "10%",
    width: "100%",
  },
  linkConfirmGroup: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  linkSignUp: {
    fontSize: 14,
    fontFamily: "quicksand_regular",
    color: colors.thirdColor,
  },
  /*Profile Picture */
  containerProfilePicture: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    justifyContent: "space-around",
    padding: 30,
    width: "100%",
  },
  imagePickerWrapper: {
    borderRadius: 1,
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderColor: colors.primaryColor,
    height: 190,
    position: "relative",
    width: "40%",
  },
  addImageIconContainer: {
    alignItems: "center",
    backgroundColor: colors.primaryColor,
    borderRadius: 30,
    bottom: -10,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    right: -10,
    width: 40,
  },

  /*Skills section */
  containerSkills: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
    justifyContent: "space-evenly",
    padding: 30,
    width: "100%",
  },
  listSkillsWrapper: {
    height: "80%",
    width: "100%",
  },
});
