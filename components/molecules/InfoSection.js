import React from "react";
import { View } from "react-native";
import { profileStyles } from "../../styles/profileStyles";
import { H3, P } from "../atoms";

const InfoSection = ({ title, description }) => {
  return (
    <View style={profileStyles.profileInfoSection}>
      <H3 plainText={title} textAlign="auto" />
      <P
        plainText={description}
        fontSize={Platform.OS === "android" ? 14 : 16}
        textAlign="auto"
      />
    </View>
  );
};

export default InfoSection;
