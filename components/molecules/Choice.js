import React from "react";
import { Text, View } from "react-native";
import { colors } from "../../styles/colors";
import { globalStyles } from "../../styles/globalStyles";

const Choice = ({ type, color }) => {
  return (
    <View
      style={[
        globalStyles.choiceContainer,
        { borderColor: color === 0 ? colors.likeColor : colors.nextColor },
      ]}
    >
      <Text
        style={[
          globalStyles.choiceTypeText,
          { color: color === 0 ? colors.likeColor : colors.nextColor },
        ]}
      >
        {type}
      </Text>
    </View>
  );
};

export default Choice;
