import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadProfileInfo, resetUserReducer, signIn } from "../redux/userDucks";
import { CustomInput, H1 } from "../components/atoms";
import { Button, CheckBox, TextLink } from "../components/molecules";
import { colors } from "../styles/colors";
import { signInStyles } from "../styles/signInStyles";
import { DefaultAlert } from "../utils/defaultAlert";

const SignIn2 = () => {
  const dispatch = useDispatch();
  const signInInfo = useSelector((state) => state.user);
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [hasError, setHasError] = useState(false);
  const [visibleStatus, setVisibleStatus] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", handlerHideKeyboardInput);
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
      setIsVisible(false);
    };
  }, []);

  useEffect(() => {
    const handleSignIn = async () => {
      const { infoSigIn, errorMessage } = signInInfo;
      if (!infoSigIn && !errorMessage) {
        return;
      }

      if (errorMessage && !infoSigIn) {
        DefaultAlert("Oopss...", errorMessage);
        setVisibleStatus(false);
        return;
      }

      if (!errorMessage && infoSigIn) {
        await AsyncStorage.setItem("swp_info", JSON.stringify(infoSigIn));
        dispatch(resetUserReducer());
        dispatch(loadProfileInfo(infoSigIn));
        navigation.reset({
          index: 0,
          routes: [{ name: "TabNavigation" }],
        });
        setVisibleStatus(false);
        return;
      }
    };
    handleSignIn();
  }, [signInInfo]);

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
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignIn = () => {
    const { email, password } = credentials;
    if (!email || !password) {
      DefaultAlert("Oops...", "Validate missing information to continue");
      setHasError(true);
      return;
    }
    dispatch(signIn(credentials));
    setVisibleStatus(true);
    setIsVisible(false);
    Keyboard.dismiss();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={signInStyles.container}
    >
      <TouchableWithoutFeedback
        style={signInStyles.container}
        onPress={handleDisappearImage}
      >
        <View style={signInStyles.container}>
          {!isVisible && (
            <View style={signInStyles.shapeWrapper}>
              <Image
                source={require("../assets/img/shape.png")}
                style={signInStyles.shape}
              />
            </View>
          )}

          <View
            style={[
              {
                height: isVisible ? "100%" : "75%",
                paddingTop:
                  Platform.OS === "android" ? 30 : isVisible ? 45 : 30,
              },
              signInStyles.formWrapper,
            ]}
          >
            <View>
              <H1 plainText="Sign In" marginBottom={"15%"} />
              {visibleStatus ? (
                <ActivityIndicator
                  size="small"
                  color={colors.primaryColor}
                  style={{ marginBottom: "5%" }}
                />
              ) : null}
              <CustomInput
                onChangeText={(text) => handleChangeInput("email", text)}
                onFocus={handlerFocusInput}
                borderColor={
                  !credentials.email && hasError
                    ? colors.logOutColor
                    : colors.primaryColor
                }
                value={credentials.email}
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Email"
                marginBottom={"9%"}
              />
              <CustomInput
                onChangeText={(text) => handleChangeInput("password", text)}
                onFocus={handlerFocusInput}
                value={credentials.password}
                isPassword={true}
                borderColor={
                  !credentials.password && hasError
                    ? colors.logOutColor
                    : colors.primaryColor
                }
                placeholder="Password"
                marginBottom={"9%"}
                textContentType="password"
              />

              <View style={signInStyles.linksSection}>
                {/*CHECKBOX AND RECOVER PASSWORD */}
                <View></View>
                <TextLink
                  type={2}
                  fontSize={12}
                  pressHandler={() => navigation.navigate("RecoverPassword")}
                  plainText="Forgot Password?"
                />
              </View>

              {/*SIGN IN BUTTON*/}

              <Button
                plainText="Sign In"
                type={3}
                pressHandler={() => handleSignIn()}
              />
            </View>

            <View style={signInStyles.createAccountWrapper}>
              <Text style={signInStyles.linkSignUp}>
                Don’t have an account?{" "}
              </Text>
              <TextLink
                type={3}
                plainText="Create new one"
                fontSize={14}
                pressHandler={() => navigation.navigate("SignUp")}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn2;
