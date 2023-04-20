import React from "react";
import { SafeAreaView, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { H2, P } from "../components/atoms";
import { registrationPsStyles } from "../styles/registrationPsStyles";
import { Button } from "../components/molecules";
import { useNavigation } from "@react-navigation/native";
const EmailSent = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Loading" }],
    });
  };
  return (
    <View style={registrationPsStyles.containerConfirm}>
      <View style={registrationPsStyles.contentConfirmWrapper}>
        <SafeAreaView
          style={[
            registrationPsStyles.textConfirmGroup,
            { marginVertical: 30 },
          ]}
        >
          <H2 plainText="Mail Sent" textAlign="center" />

          <View style={registrationPsStyles.iconConfirmWrapper}>
            <MaterialCommunityIcons
              name="email-receive"
              size={150}
              color="#0095DA"
            />
          </View>

          <View>
            <P
              fontSize={Platform.OS === "android" ? 14 : 16}
              plainText="Look at your mail and open the link to recover the password. "
              textAlign="center"
            />
          </View>
        </SafeAreaView>

        <SafeAreaView>
          <Button
            plainText="Continue"
            type={3}
            pressHandler={() => handleContinue()}
            marginBottom={"2.5%"}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default EmailSent;
