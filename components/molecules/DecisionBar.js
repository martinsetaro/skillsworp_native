import React from "react";
import { View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { RoundButton } from "../atoms";

const DecisionBar = ({ handleChoice, profiles }) => {
  return (
    <View style={globalStyles.decisionBarContainer}>
      <RoundButton
        name="times"
        size={45}
        color={"#fafafa"}
        type={0}
        onPress={() => handleChoice(-1, profiles)}
      />
      <RoundButton
        name="heart"
        size={37}
        color={"#fafafa"}
        type={1}
        onPress={() => handleChoice(1, profiles)}
      />
    </View>
  );
};

export default DecisionBar;
