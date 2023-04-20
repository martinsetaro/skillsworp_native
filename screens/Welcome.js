import React from "react";
import logo from "../assets/img/logoskilswop.png";
import { Image, Platform, View } from "react-native";
import { welcomeStyles } from "../styles/welcomeStyles";
import { Button, TextLink } from "../components/molecules";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={welcomeStyles.container}>
      <View></View>

      <View style={welcomeStyles.imgWrapper}>
        <Image source={logo} style={welcomeStyles.logo} />
      </View>

      <View style={welcomeStyles.btnSection}>
        <Button
          type={1}
          plainText="CREATE ACCOUNT"
          pressHandler={() => navigation.navigate("SignUp")}
          marginBottom={"3%"}
        />
        <Button
          type={2}
          plainText="SIGN IN"
          pressHandler={() => navigation.navigate("SignIn")}
          marginBottom={"3%"}
        />

        <TextLink
          type={1}
          plainText="Trouble signing in?"
          pressHandler={() => navigation.navigate("RecoverPassword")}
          fontSize={Platform.OS === "android" ? 15 : 18}
        />
      </View>
    </View>
  );
};

export default Welcome;
