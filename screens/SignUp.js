import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CustomInput, H1 } from "../components/atoms";
import { Button } from "../components/molecules";
import { signUpStyles } from "../styles/signupStyles";
import { DefaultAlert } from "../utils/defaultAlert";
import { colors } from "../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { saveSignupInfo } from "../redux/registerDucks";

const SignUp2 = () => {
  //const signUpInfo = useSelector((state) => state.user);
  const location = useSelector((state) => state.location.location);
  const address = useSelector((state) => state.location.address);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    location: null,
    address: null,
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
    const getLocation = () => {
      if (!location && !address) {
        return;
      }

      setAccount({ ...account, location, address });
    };
    getLocation();
  }, [location, address]);

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
    const validMail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const validPassword = new RegExp("^[a-zA-Z0-9_.-]*$");
    const { email, password, confirmPassword, location } = account;
    if (!email || !password || !confirmPassword) {
      setHasError(true);
      DefaultAlert("Ooopss...", "Validate missing information to continue");
      return;
    }

    if (password !== confirmPassword) {
      setHasError(true);
      DefaultAlert("Ooopss...", "Different passwords, validate to continue");
      return;
    }

    if (!validMail.test(email)) {
      DefaultAlert("Ooopss...", "Provide a valid mail");
      return;
    }
    if (!validPassword.test(password) || password.length < 7) {
      DefaultAlert(
        "Ooopss...",
        "Your password is weak, it needs at least 8 characters and 1 number"
      );
      return;
    }
    const currentUser = {
      email,
      password,
      role: "user",
      location: {
        type: "Point",
        coordinates: [location.coords.longitude, location.coords.latitude],
      },
      address: address,
    };

    dispatch(saveSignupInfo(currentUser));
    navigation.navigate("MyNameIs");
  };

  return (
    <KeyboardAvoidingView behavior={null} style={signUpStyles.container}>
      <TouchableWithoutFeedback
        style={signUpStyles.container}
        onPress={handleDisappearImage}
      >
        <View style={signUpStyles.container}>
          {!isVisible && (
            <View style={signUpStyles.shapeWrapper}>
              <Image
                source={require("../assets/img/shape.png")}
                style={signUpStyles.shape}
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
              signUpStyles.formWrapper,
            ]}
          >
            <H1 plainText="Create an" />
            <H1 plainText="Account" marginBottom={isVisible ? "8%" : "10%"} />

            <CustomInput
              onChangeText={(text) => handleChangeInput("email", text)}
              onFocus={handlerFocusInput}
              value={account.email}
              placeholder="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
              borderColor={
                !account.email && hasError
                  ? colors.logOutColor
                  : colors.primaryColor
              }
              marginBottom={isVisible ? "6%" : "7.5%"}
            />
            <CustomInput
              onChangeText={(text) => handleChangeInput("password", text)}
              onFocus={handlerFocusInput}
              value={account.password}
              placeholder="Password"
              isPassword={true}
              borderColor={
                !account.password && hasError
                  ? colors.logOutColor
                  : colors.primaryColor
              }
              marginBottom={isVisible ? "6%" : "7.5%"}
            />
            <CustomInput
              onChangeText={(text) =>
                handleChangeInput("confirmPassword", text)
              }
              onFocus={handlerFocusInput}
              value={account.confirmPassword}
              placeholder="Confirm password"
              isPassword={true}
              borderColor={
                !account.confirmPassword && hasError
                  ? colors.logOutColor
                  : colors.primaryColor
              }
              marginBottom={isVisible ? "6%" : "7.5%"}
            />
            <Button
              plainText="Continue"
              type={3}
              pressHandler={postProfileInfo}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp2;
