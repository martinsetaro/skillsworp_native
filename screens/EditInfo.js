import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomInput, H1 } from "../components/atoms";
import { Button } from "../components/molecules";
import { signUpStyles } from "../styles/signupStyles";
import { DefaultAlert } from "../utils/defaultAlert";
import { colors } from "../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { loadProfileInfo, updateProfile } from "../redux/userDucks";

const EditInfo = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [infoProfile, setInfoProfile] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", handlerHideKeyboardInput);
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
      setIsVisible(false);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const loadProfileInfo = () => {
        if (!user) {
          return;
        }

        setInfoProfile({
          name: user.myInfo.user.name,
          phone: user.myInfo.user.phone,
        });
      };
      loadProfileInfo();
    }, [user])
  );

  useEffect(() => {
    const handleUpdate = async () => {
      const { infoUpdate, errorMessage } = user;
      if (!infoUpdate && !errorMessage) {
        return;
      }

      if (errorMessage && !infoUpdate) {
        DefaultAlert("Oopss...", errorMessage);
        return;
      }

      if (!errorMessage && infoUpdate) {
        const newInfo = user;
        newInfo.myInfo.user.name = infoProfile.name;
        newInfo.myInfo.user.phone = infoProfile.phone;
        await AsyncStorage.setItem(
          "swp_info",
          JSON.stringify({
            user: newInfo.myInfo.user,
            tokens: newInfo.myInfo.tokens,
          })
        );

        dispatch(
          loadProfileInfo({
            user: newInfo.myInfo.user,
            tokens: newInfo.myInfo.tokens,
          })
        );
        navigation.reset({
          index: 0,
          routes: [{ name: "TabNavigation" }],
        });
      }
    };
    handleUpdate();
  }, [user]);

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

  const handleSave = () => {
    const { name, phone } = infoProfile;
    if (!name || !phone) {
      DefaultAlert("Oops...", "Validate missing information to continue");
      setHasError(true);
      return;
    }

    dispatch(
      updateProfile(
        user.myInfo.user.id,
        infoProfile,
        user.myInfo.tokens.access.token
      )
    );
  };

  const handleChangeInput = (name, value) => {
    setHasError(false);
    setInfoProfile({ ...infoProfile, [name]: value });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={signUpStyles.container}
    >
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
            <H1
              plainText="Edit profile"
              marginBottom={isVisible ? "8%" : "10%"}
            />
            <CustomInput
              onChangeText={(text) => handleChangeInput("name", text)}
              value={infoProfile.name}
              onFocus={handlerFocusInput}
              placeholder="Full Name"
              borderColor={
                !infoProfile.name && hasError
                  ? colors.logOutColor
                  : colors.primaryColor
              }
              marginBottom={isVisible ? "6%" : "7.5%"}
            />
            <CustomInput
              onChangeText={(text) => handleChangeInput("phone", text)}
              onFocus={handlerFocusInput}
              value={infoProfile.phone}
              maxLength={10}
              placeholder="Phone"
              borderColor={
                !infoProfile.name && hasError
                  ? colors.logOutColor
                  : colors.primaryColor
              }
              marginBottom={isVisible ? "6%" : "7.5%"}
            />

            <Button
              plainText="SAVE"
              type={3}
              pressHandler={() => handleSave()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditInfo;
