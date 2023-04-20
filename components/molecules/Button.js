import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

const Button = ({ type = 1, pressHandler, plainText, marginBottom = 0 }) => {
  switch (type) {
    case 1:
      return (
        <TouchableOpacity
          onPress={pressHandler}
          style={[globalStyles.primaryButton, { marginBottom }]}
        >
          <Text style={globalStyles.labelPrimaryBtn}>{plainText}</Text>
        </TouchableOpacity>
      );
    case 2:
      return (
        <TouchableOpacity
          onPress={pressHandler}
          style={[globalStyles.secondaryButton, { marginBottom }]}
        >
          <Text style={globalStyles.labelSecondaryBtn}>{plainText}</Text>
        </TouchableOpacity>
      );
    case 3:
      return (
        <TouchableOpacity
          onPress={pressHandler}
          style={[globalStyles.thirdButton, { marginBottom }]}
        >
          <Text style={globalStyles.labelThirdBtn}>{plainText}</Text>
        </TouchableOpacity>
      );
    case 4:
      return (
        <TouchableOpacity
          onPress={pressHandler}
          style={[globalStyles.fourthButton, { marginBottom }]}
        >
          <Text style={globalStyles.labelFourthBtn}>{plainText}</Text>
        </TouchableOpacity>
      );

    case 5:
      return (
        <TouchableOpacity
          onPress={pressHandler}
          style={[globalStyles.fivethButton, { marginBottom }]}
        >
          <Text style={globalStyles.labelFivethBtn}>{plainText}</Text>
        </TouchableOpacity>
      );

    default:
      return (
        <TouchableOpacity
          onPress={pressHandler}
          style={[globalStyles.primaryButton, { marginBottom }]}
        >
          <Text style={globalStyles.labelPrimaryBtn}>{plainText}</Text>
        </TouchableOpacity>
      );
  }
};

export default Button;
