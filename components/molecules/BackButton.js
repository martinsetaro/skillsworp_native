import React from "react";
import { Image, View, TouchableOpacity } from "react-native";

const BackButton = ({ navigation, type = 1 }) => {
  switch (type) {
    case 1:
      return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/img/backButton.png")} />
        </TouchableOpacity>
      );
    case 2:
      return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/img/back_btn_2.png")} />
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/img/backButton.png")} />
        </TouchableOpacity>
      );
  }
};

export default BackButton;
