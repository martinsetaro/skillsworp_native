import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput, H2, P } from "../components/atoms";
import { Button, TextLink } from "../components/molecules";
import { saveSignupInfo } from "../redux/registerDucks";
import { registerProfile, resetUserReducer } from "../redux/userDucks";
import { colors } from "../styles/colors";
import { myNameIsStyles } from "../styles/myNameStyles";
import { DefaultAlert } from "../utils/defaultAlert";
const MyNameIs = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const registerInfo = useSelector((state) => state.register);
  const signUpInfo = useSelector((state) => state.user);
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [account, setAccount] = useState({
    fullName: "",
    phone: "",
  });

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", handlerHideKeyboardInput);
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
      setIsVisible(false);
    };
  }, []);

  useEffect(() => {
    const handleSignUp = async () => {
      const { infoSigUp, errorMessage } = signUpInfo;
      if (!infoSigUp && !errorMessage) {
        return;
      }

      if (errorMessage && !infoSigUp) {
        DefaultAlert("Oopss...", errorMessage);
        setVisibleStatus(false);
        return;
      }

      if (!errorMessage && infoSigUp) {
        await AsyncStorage.setItem("swp_info", JSON.stringify(infoSigUp));
        dispatch(resetUserReducer());

        setVisibleStatus(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "ProfilePicture" }],
        });
        return;
      }
    };
    handleSignUp();
  }, [signUpInfo]);

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

  const handleChangeInput = (name, value) => {
    setHasError(false);
    setAccount({ ...account, [name]: value });
  };

  const postProfileInfo = () => {
    const { fullName, phone } = account;
    if (!fullName || !phone) {
      setHasError(true);
      DefaultAlert("Ooopss...", "Validate missing information to continue");
      return;
    }

    const currentUser = {
      ...registerInfo.registerInfo,
      name: fullName,
      phone,
    };
    //dispatch(saveSignupInfo(currentUser));
    dispatch(registerProfile(currentUser));
    setVisibleStatus(true);
    /*navigation.reset({
      index: 0,
      routes: [{ name: "ProfilePicture" }],
    });*/
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={myNameIsStyles.container}
    >
      <TouchableWithoutFeedback onPress={handleDisappearImage}>
        <View style={myNameIsStyles.contentWrapper}>
          <View>
            <H2 plainText="Congrats! you're" textAlign="auto" />
            <H2 plainText="almost done" textAlign="auto" marginBottom={"4%"} />
            <P
              plainText="This is how it will appear in skilswop"
              fontSize={Platform.OS === "android" ? 14 : 16}
              textAlign="auto"
              marginBottom="15%"
            />
          </View>

          <View>
            {visibleStatus && (
              <ActivityIndicator
                size="small"
                color={colors.primaryColor}
                style={{ marginBottom: "5%" }}
              />
            )}
            <CustomInput
              autoFocus={true}
              onChangeText={(text) => handleChangeInput("fullName", text)}
              value={account.fullName}
              onFocus={handlerFocusInput}
              placeholder="Full Name"
              maxLength={20}
              borderColor={
                !account.fullName && hasError
                  ? colors.logOutColor
                  : colors.primaryColor
              }
              marginBottom={"6%"}
            />
            <CustomInput
              onChangeText={(text) => handleChangeInput("phone", text)}
              onFocus={handlerFocusInput}
              value={account.phone}
              placeholder="Phone"
              keyboardType="phone-pad"
              maxLength={10}
              textContentType="telephoneNumber"
              borderColor={
                !account.phone && hasError
                  ? colors.logOutColor
                  : colors.primaryColor
              }
              marginBottom={"6%"}
            />

            <Button
              plainText="Continue"
              type={3}
              pressHandler={postProfileInfo}
              marginBottom={"6%"}
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

export default MyNameIs;
