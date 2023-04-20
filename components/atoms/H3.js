import React from "react";
import { Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
const H3 = ({ plainText, marginBottom, textAlign = "auto" }) => {
  return (
    <Text style={[globalStyles.h3, { marginBottom, textAlign }]}>
      {plainText}
    </Text>
  );
};

export default H3;
