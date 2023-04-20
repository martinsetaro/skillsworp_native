import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { H2, P } from "../components/atoms";
import { registrationPsStyles } from "../styles/registrationPsStyles";
import { Button, CodeInputs, TextLink } from "../components/molecules";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { DefaultAlert } from "../utils/defaultAlert";

const CodeConfirmation = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [fromScreen, setFromScreen] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [sendAgain, setSendAgain] = useState(0);

  const [codeConfirmation, setCodeConfirmation] = useState({
    value_1: "",
    value_2: "",
    value_3: "",
    value_4: "",
    value_5: "",
    value_6: "",
  });

  useEffect(() => {
    const getParams = () => {
      if (!params) {
        return;
      }
      setFromScreen(params.validation);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", handlerHideKeyboardInput);
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
      setIsVisible(false);
    };
  }, []);

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

  const sendCodeConfirmation = () => {
    console.log("sending code simulation...");
    console.log("Sent...");
  };

  const handleChangeCode = (name, value, refInput, isLastCode) => {
    setCodeConfirmation({ ...codeConfirmation, [name]: value });
    if (!isLastCode) {
      refInput.current.focus();
    } else {
      Keyboard.dismiss();
    }
  };

  const handleSendAgain = () => {
    if (sendAgain >= 3) {
      DefaultAlert(
        "Wait",
        "Wait 5 minutes or more to receive the code. If you don't receive the code in this time contact support..."
      );
    } else {
      sendCodeConfirmation();
      setSendAgain(sendAgain + 1);
    }
  };

  const handleContinue = () => {
    const { value_1, value_2, value_3, value_4, value_5, value_6 } =
      codeConfirmation;
    if (!value_1 || !value_2 || !value_3 || !value_4 || !value_5 || !value_6) {
      DefaultAlert(
        "Ooopss...",
        "Missing information in code, insert all the digits to continue"
      );
      return;
    }
    navigation.navigate("ProfilePicture");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? null : "padding"}
      style={registrationPsStyles.containerConfirm}
    >
      <TouchableWithoutFeedback
        onPress={handleDisappearImage}
        style={registrationPsStyles.touchableWrapper}
      >
        <View style={registrationPsStyles.contentConfirmWrapper}>
          <SafeAreaView
            style={[
              registrationPsStyles.textConfirmGroup,
              { marginVertical: isVisible ? 0 : 30 },
            ]}
          >
            <H2 plainText="Confirmation" textAlign="center" />

            <View style={registrationPsStyles.iconConfirmWrapper}>
              <MaterialCommunityIcons
                name="email-receive"
                size={Platform.OS === "ios" ? 150 : isVisible ? 80 : 150}
                color="#0095DA"
              />
            </View>

            <View>
              <P
                fontSize={Platform.OS === "android" ? 14 : 16}
                plainText="Enter the 6 digit code sent to you"
                textAlign="center"
              />
              <P
                plainText="mail"
                fontSize={Platform.OS === "android" ? 14 : 16}
                textAlign="center"
              />
            </View>
          </SafeAreaView>

          <SafeAreaView>
            <CodeInputs
              codeConfirmation={codeConfirmation}
              handleChangeCode={handleChangeCode}
              marginBottom={
                Platform.OS === "android" && isVisible ? "3%" : "15%"
              }
              handlerOnFocus={handlerFocusInput}
            />
            <Button
              plainText="Continue"
              type={3}
              pressHandler={() => handleContinue()}
              marginBottom={isVisible ? "1%" : "2.5%"}
            />
            {!fromScreen && fromScreen !== "register" ? (
              <TextLink
                type={4}
                pressHandler={() => navigation.goBack()}
                plainText="Back"
                fontSize={Platform.OS === "android" ? 15 : 18}
              />
            ) : null}
          </SafeAreaView>

          <View style={registrationPsStyles.linkConfirmGroup}>
            <Text style={registrationPsStyles.linkSignUp}>Troubles?</Text>
            <TextLink
              type={3}
              plainText=" Send code again"
              fontSize={14}
              pressHandler={() => handleSendAgain()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CodeConfirmation;
