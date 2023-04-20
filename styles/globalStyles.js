import { StyleSheet, Platform } from "react-native";
import { CARDPROPS } from "../utils/constants";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  /*BUTTONS*/
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.primaryColor,
    borderRadius: 40,
    height: 48,
    justifyContent: "center",
    width: "100%",
    // SHADOW
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  labelPrimaryBtn: {
    color: colors.backgroundPrimary,
    fontFamily: "quicksand_bold",
    fontSize: Platform.OS === "android" ? 15 : 18,
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: colors.secondaryColor,
    borderRadius: 40,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    width: "100%",
  },
  labelSecondaryBtn: {
    color: colors.secondaryColor,
    fontFamily: "quicksand_bold",
    fontSize: Platform.OS === "android" ? 15 : 18,
  },
  thirdButton: {
    alignItems: "center",
    backgroundColor: colors.secondaryColor,
    borderRadius: 40,
    height: 48,
    justifyContent: "center",
    width: "100%",
    // SHADOW
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  labelThirdBtn: {
    color: colors.backgroundPrimary,
    fontFamily: "quicksand_bold",
    fontSize: Platform.OS === "android" ? 15 : 18,
  },
  fourthButton: {
    alignItems: "center",
    backgroundColor: colors.secondaryColor,
    borderRadius: 30,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: 30,
    justifyContent: "center",
    width: "15%",
  },
  labelFourthBtn: {
    color: colors.backgroundPrimary,
    fontFamily: "quicksand_bold",
    fontSize: Platform.OS === "android" ? 13 : 15,
  },
  fivethButton: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: colors.primaryColor,
    borderWidth: 1,
    height: 35,
    justifyContent: "center",
    width: "30%",
  },
  labelFivethBtn: {
    color: colors.primaryColor,
    fontFamily: "quicksand_bold",
    fontSize: Platform.OS === "android" ? 13 : 15,
  },
  /* Text Links styles */
  primaryTextLink: {
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    width: "100%",
  },
  labelTextLink: {
    color: colors.secondaryColor,
    fontFamily: "quicksand_bold",
  },
  secondaryTextLink: {
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryLabelTextLink: {
    color: colors.primaryColor,
    fontFamily: "quicksand_bold",
  },
  thirdLabelTextLink: {
    color: colors.secondaryColor,
    fontFamily: "quicksand_bold",
  },
  fourthTextLink: {
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    width: "100%",
  },
  fourthLabelTextLink: {
    color: colors.thirdColor,
    fontFamily: "quicksand_regular",
  },
  fivethTextLink: {
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    width: "100%",
  },
  fivethLabelTextLink: {
    color: colors.logOutColor,
    fontFamily: "quicksand_bold",
    fontSize: Platform.OS === "android" ? 15 : 18,
  },
  /* HEADERS TEXT */
  h1: {
    color: colors.primaryColor,
    fontSize: 25,
    fontFamily: "montserrat_bold",
  },
  h2: {
    fontSize: 30,
    fontFamily: "montserrat_bold",
  },
  h3: {
    color: colors.primaryColor,
    fontSize: 20,
    fontFamily: "montserrat_bold",
  },
  h4: {
    color: colors.thirdColor,
    fontSize: 15,
    fontFamily: "montserrat_bold",
  },
  /*Paragraphs */
  p: {
    color: colors.thirdColor,
    fontFamily: "quicksand_regular",
  },
  /* CheckBox */
  checkboxLabel: {
    color: colors.primaryColor,
    fontSize: 12,
    fontFamily: "quicksand_regular",
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  /* TEXT INPUTS */
  primaryInput: {
    borderColor: colors.primaryColor,
    borderRadius: 20,
    borderWidth: 1,
    color: colors.primaryColor,
    height: 45,
    padding: 8,
    width: "100%",
  },
  secondaryInput: {
    borderColor: colors.primaryColor,
    borderBottomWidth: 1,
    color: colors.thirdColor,
    height: 30,
    paddingLeft: 25,
    position: "relative",
    width: "100%",
  },
  secondaryInputIcon: {
    left: 0,
    bottom: 5,
    position: "absolute",
  },
  thirdInput: {
    backgroundColor: colors.thirdColor,
    borderRadius: 20,
    borderTopEndRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomEndRadius: 0,
    color: colors.backgroundPrimary,
    fontFamily: "quicksand_bold",
    height: 30,
    opacity: 0.25,
    padding: 8,
    width: "83%",
  },
  /* SHAPES */
  rectangle: {
    backgroundColor: colors.primaryColor,
    height: 150,
    width: "100%",
  },
  skillWrapper: {
    alignItems: "center",
    //borderColor: colors.primaryColor,
    borderRadius: 30,
    borderWidth: 1.2,
    flexBasis: "auto",
    height: 40,
    justifyContent: "center",
    marginVertical: "3%",
    marginRight: "3%",
    minWidth: "28%",
    padding: 3,
  },
  skillLabel: {
    //color: colors.primaryColor,
    fontSize: Platform.OS === "android" ? 14 : 16,
    fontFamily: "quicksand_light",
  },
  skillSecondaryWrapper: {
    alignItems: "center",
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 35,
    elevation: 2,
    height: 35,
    justifyContent: "center",
    marginRight: "3%",
    marginTop: "3%",
    minWidth: "25%",
    padding: 5,
    width: "auto",
  },
  skillSecondaryLabel: {
    color: colors.primaryColor,
    fontSize: Platform.OS === "android" ? 14 : 16,
    fontFamily: "quicksand_bold",
  },
  skillThirdWrapper: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: colors.primaryColor,
    borderRadius: 30,
    borderWidth: 1.2,
    height: 35,
    justifyContent: "center",
    marginRight: 15,
    minWidth: 80,
    padding: 3,
    width: "auto",
  },
  skillThirdLabel: {
    color: colors.primaryColor,
    fontSize: 14,
    fontFamily: "quicksand_bold",
  },
  /*Code confirmation */
  codeInputsGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  codeInput: {
    alignItems: "center",
    borderColor: "#0095DA",
    borderRadius: 13,
    borderWidth: 1,
    color: "#0095DA",
    height: 40,
    justifyContent: "center",
    padding: 4,
    width: "12%",
  },
  /* SWIPE STYLES */
  cardProfileContent: {
    position: "absolute",
  },
  cardProfileImage: {
    borderRadius: CARDPROPS.borderRadius,
    height: CARDPROPS.height,
    width: CARDPROPS.width,
  },
  cardProfileInfo: {
    position: "absolute",
    bottom: "20%",
    left: "5%",
    width: "100%",
  },
  cardProfileName: {
    color: colors.backgroundPrimary,
    fontSize: 30,
    fontFamily: "montserrat_bold",
  },
  cardProfileLocation: {
    color: colors.backgroundPrimary,
    flexWrap: "wrap",
    fontSize: Platform.OS === "android" ? 16 : 20,
    fontFamily: "quicksand_regular",
    width: "auto",
  },
  cardProfileSkillsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden",
    width: "90%",
  },
  cardProfileGradient: {
    bottom: 0,
    borderRadius: CARDPROPS.borderRadius,
    height: 120,
    left: 0,
    position: "absolute",
    right: 0,
  },
  renderChoiceContainer: {
    position: "absolute",
    top: 100,
  },
  likeContainer: {
    left: 45,
    transform: [{ rotate: "-30deg" }],
  },
  nextContainer: {
    right: 45,
    transform: [{ rotate: "30deg" }],
  },
  choiceContainer: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
    borderWidth: 7,
    paddingHorizontal: 15,
  },
  choiceTypeText: {
    fontSize: 45,
    fontFamily: "montserrat_bold",
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  decisionBarContainer: {
    alignItems: "center",
    bottom: Platform.OS === "android" ? 8 : 10,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    width: "100%",
  },
  roundButtonContainer: {
    alignItems: "center",
    borderRadius: 80,
    height: 80,
    justifyContent: "center",
    elevation: 5,
    width: 80,
  },
  /*HEADER  */
  header: {
    alignItems: Platform.OS === "android" ? "baseline" : "center",
    //backgroundColor: 'blue',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? 0 : 0,
    width: "95%",
  },
  headerProfileImg: {
    borderRadius: 40,
    height: 40,
    width: 40,
  },
  headerLogo: {
    height: 40,
    width: 80,
  },
  headerChat: {
    alignItems: "center",
    flexDirection: "row",
  },
  /*UTILS */
  centerItems: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  iconSize: {
    height: "100%",
    width: "100%",
  },
  flexRowCenter: {
    alignItems: "center",
    flexDirection: "row",
  },
  fullSize: {
    height: "100%",
    width: "100%",
  },
  fullWidth: {
    width: "100%",
  },
});
