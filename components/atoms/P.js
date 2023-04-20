import React from "react";
import { Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
const P = ({
  plainText,
  marginBottom = 0,
  fontSize = 16,
  textAlign = "auto",
}) => {
  return (
    <Text style={[globalStyles.p, { marginBottom, fontSize, textAlign }]}>
      {plainText}
    </Text>
  );
};

export default P;
