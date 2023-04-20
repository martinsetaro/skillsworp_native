const { Dimensions } = require("react-native");
const { height, width } = Dimensions.get("screen");

export const CARDPROPS = {
  borderRadius: 20,
  height: height * 0.78,
  width: width * 0.9,
  out_of_screen: width + 0.5 * width,
};

export const ACTION_OFFSET = 100;

export const DEVICE_WIDTH = width;

export const HS = "http://netrunner.servegame.com:4003";
