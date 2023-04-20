import React from "react";
import { Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
const H1 = ({ plainText, marginBottom }) => {
  return <Text style={[globalStyles.h1, { marginBottom }]}>{plainText}</Text>;
};

export default H1;
