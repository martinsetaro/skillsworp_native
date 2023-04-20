import React from "react";
import { Text } from "react-native";
import { colors } from "../../styles/colors";
import { globalStyles } from "../../styles/globalStyles";
const H2 = ({
  plainText,
  marginBottom,
  textAlign = "auto",
  color = colors.primaryColor,
}) => {
  return (
    <Text style={[globalStyles.h2, { marginBottom, textAlign, color }]}>
      {plainText}
    </Text>
  );
};

export default H2;
