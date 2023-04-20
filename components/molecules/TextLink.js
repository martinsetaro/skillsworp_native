import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

const TextLink = ({
  type,
  pressHandler,
  marginBottom = 0,
  fontSize = 0,
  plainText,
}) => {
  switch (type) {
    case 1:
      return (
        <TouchableOpacity
          onPress={pressHandler}
          style={[globalStyles.primaryTextLink, { marginBottom }]}
        >
          <Text style={[globalStyles.labelTextLink, { fontSize }]}>
            {plainText}
          </Text>
        </TouchableOpacity>
      );
    case 2:
      return (
        <TouchableOpacity
          onPress={pressHandler}
          style={globalStyles.secondaryTextLink}
        >
          <Text style={[globalStyles.secondaryLabelTextLink, { fontSize }]}>
            {plainText}
          </Text>
        </TouchableOpacity>
      );
    case 3:
      return (
        <TouchableOpacity onPress={pressHandler}>
          <Text style={[globalStyles.thirdLabelTextLink, { fontSize }]}>
            {plainText}
          </Text>
        </TouchableOpacity>
      );
    case 4:
      return (
        <TouchableOpacity
          onPress={pressHandler}
          style={globalStyles.fourthTextLink}
        >
          <Text style={[globalStyles.fourthLabelTextLink, { fontSize }]}>
            {plainText}
          </Text>
        </TouchableOpacity>
      );
    case 5:
      return (
        <TouchableOpacity
          onPress={pressHandler}
          style={globalStyles.fivethTextLink}
        >
          <Text style={[globalStyles.fivethLabelTextLink, { fontSize }]}>
            {plainText}
          </Text>
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity
          onPress={pressHandler}
          style={[globalStyles.primaryTextLink, { marginBottom }]}
        >
          <Text style={[globalStyles.labelTextLink, { fontSize }]}>
            {plainText}
          </Text>
        </TouchableOpacity>
      );
  }
};

export default TextLink;
