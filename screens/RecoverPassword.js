import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomInput, H2, P } from "../components/atoms";
import { globalStyles } from "../styles/globalStyles";
import { registrationPsStyles } from "../styles/registrationPsStyles";
import { Button, TextLink } from "../components/molecules";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../styles/colors";
import { DefaultAlert } from "../utils/defaultAlert";
import { useDispatch, useSelector } from "react-redux";
import { postForgotPassword, resetAuth } from "../redux/authDucks";

const RecoverPassword = () => {
  const navigation = useNavigation();
  const authInfo = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", handlerHideKeyboardInput);
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
      setIsVisible(false);
    };
  }, []);

  useEffect(() => {
    const handleRecoverPassword = async () => {
      const { recover_password, errorMessage } = authInfo;
      if (!recover_password && !errorMessage) {
        return;
      }

      if (errorMessage && !recover_password) {
        DefaultAlert("Oopss...", errorMessage);
        return;
      }

      if (!errorMessage && recover_password) {
        dispatch(resetAuth());
        navigation.reset({
          index: 0,
          routes: [{ name: "EmailSent" }],
        });
      }
    };
    handleRecoverPassword();
    return () => {
      setEmail("");
    };
  }, [authInfo]);

  const handleDisappearImage = () => {
    Keyboard.dismiss();
    setIsVisible(false);
  };
  const handlerFocusInput = () => {
    setIsVisible(true);
  };

  const handlerHideKeyboardInput = () => {
    setIsVisible(false);
  };

  const handleChangeEmail = (text) => {
    setHasError(false);
    setEmail(text);
  };

  const handleContinue = () => {
    if (!email) {
      DefaultAlert("Oops...", "Validate missing information to continue");
      setHasError(true);
      return;
    }

    dispatch(postForgotPassword(email));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={registrationPsStyles.containerRecover}
    >
      <TouchableWithoutFeedback
        onPress={handleDisappearImage}
        style={registrationPsStyles.touchableWrapper}
      >
        <View style={registrationPsStyles.contentRecoverWrapper}>
          <View style={registrationPsStyles.textRecoverWrapper}>
            <View style={globalStyles.centerItems}>
              <H2 plainText="Forgot password?" marginBottom={"13%"} />
            </View>

            <View style={registrationPsStyles.iconRecoverWrapper}>
              <MaterialCommunityIcons
                name="email-lock"
                size={150}
                color="#0095DA"
              />
            </View>
            <P
              plainText="Don’t worry! it happens. Please enter the email associated with your account."
              textAlign="center"
              marginBottom={Platform.OS === "ios" ? 0 : isVisible ? "3.5%" : 0}
            />
          </View>

          <View style={registrationPsStyles.textRecoverWrapper}>
            <CustomInput
              onChangeText={(text) => handleChangeEmail(text)}
              onFocus={handlerFocusInput}
              value={email}
              borderColor={
                !email && hasError ? colors.logOutColor : colors.primaryColor
              }
              placeholder="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
              marginBottom={"5.5%"}
            />
            <Button
              plainText="Continue"
              type={3}
              pressHandler={() => handleContinue()}
              marginBottom={isVisible ? "1.5%" : "2.5%"}
            />
            <TextLink
              type={4}
              pressHandler={() => navigation.goBack()}
              plainText="Back"
              fontSize={Platform.OS === "android" ? 15 : 18}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RecoverPassword;
