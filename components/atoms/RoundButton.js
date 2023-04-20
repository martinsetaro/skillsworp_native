import React, { useCallback, useRef } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import { colors } from "../../styles/colors";
const RoundButton = ({ name, color, size, type, onPress }) => {
  /* 1 === NEXT && 0 === LIKE */
  const scale = useRef(new Animated.Value(1)).current;
  const animatedScale = useCallback(
    (newValue) => {
      Animated.spring(scale, {
        toValue: newValue,
        friction: 4,
        useNativeDriver: true,
      }).start();
    },
    [scale]
  );
  return (
    <TouchableWithoutFeedback
      delayPressIn={0}
      onPressIn={() => animatedScale(0.8)}
      onPressOut={() => {
        animatedScale(1);
        onPress();
      }}
      delayPressOut={110}
    >
      <Animated.View
        style={[
          globalStyles.roundButtonContainer,
          {
            transform: [{ scale }],
            backgroundColor: type === 0 ? colors.nextColor : colors.likeColor,
          },
        ]}
      >
        <FontAwesome name={name} color={color} size={size} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default RoundButton;
