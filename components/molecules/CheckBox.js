import React from "react";
import { View, Text } from "react-native";

import Checkbox from "expo-checkbox";
import { globalStyles } from "../../styles/globalStyles";

const CheckBox = ({ plainText }) => {
  return (
    <View style={globalStyles.checkboxWrapper}>
      <Checkbox color={"#0095DA"} style={{ marginRight: 5 }} />
      <Text style={globalStyles.checkboxLabel}>{plainText}</Text>
    </View>
  );
};

export default CheckBox;
