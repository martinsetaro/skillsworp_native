import React from "react";
import { Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
const H4 = ({ plainText, marginBottom, textAlign = "auto" }) => {
  return (
    <Text style={[globalStyles.h4, { marginBottom, textAlign }]}>
      {plainText}
    </Text>
  );
};

export default H4;
