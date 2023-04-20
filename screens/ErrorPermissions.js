import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { colors } from "../styles/colors";
import { globalStyles } from "../styles/globalStyles";
import { registrationPsStyles } from "../styles/registrationPsStyles";
import { H2, P } from "../components/atoms";
import { Button } from "../components/molecules";
import { useNavigation } from "@react-navigation/native";
const ErrorPermissions = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [messagePermission, setMessagePermission] = useState("");

  useEffect(() => {
    const loadMessage = () => {
      if (params.permissionDenied === "location ") {
        setMessagePermission(
          "We need permission to access your location to show you all people nearest to you. Enable in app settings privacy and press the button continue."
        );
      } else {
        setMessagePermission(
          "We need permission to access your camera and media library to save and share your image profile in skilswop. Enable in app settings privacy and press the button continue."
        );
      }
    };
    loadMessage();
    return () => {
      setMessagePermission("");
    };
  }, [params]);

  return (
    <View style={[registrationPsStyles.contentRecoverWrapper, { padding: 30 }]}>
      <View style={registrationPsStyles.textRecoverWrapper}>
        <View style={globalStyles.centerItems}>
          <H2
            textAlign="center"
            plainText="Access Denied"
            marginBottom={"13%"}
          />
        </View>

        <View style={registrationPsStyles.iconRecoverWrapper}>
          <MaterialIcons
            name="block-flipped"
            size={150}
            color={colors.primaryColor}
          />
        </View>
        <P
          plainText={messagePermission ? messagePermission : ""}
          textAlign="center"
          marginBottom={"3.5%"}
        />
      </View>

      <View style={registrationPsStyles.textRecoverWrapper}>
        <Button
          plainText="Continue"
          type={3}
          pressHandler={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Loading" }],
            })
          }
        />
      </View>
    </View>
  );
};

export default ErrorPermissions;
