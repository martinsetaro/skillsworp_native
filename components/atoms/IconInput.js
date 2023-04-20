import React from "react";
import { TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";

const IconInput = ({
  onChangeText,
  onFocus,
  value,
  placeholder,
  keyboardType = "default",
  textContentType = "none",
  marginBottom = 0,
  borderColor = "#0095DA",
  name,
  size,
  color,
}) => {
  return (
    <View style={globalStyles.fullWidth}>
      <Feather
        name={name}
        size={size}
        color={color}
        style={globalStyles.secondaryInputIcon}
      />
      <TextInput
        onChangeText={onChangeText}
        onFocus={onFocus}
        //onBlur={onBlur}
        value={value}
        //disableFullscreenUI={true}
        //onKeyPress={onKeyPress}
        placeholder={placeholder}
        placeholderTextColor={"#0095DA"}
        keyboardType={keyboardType}
        textContentType={textContentType}
        style={[globalStyles.secondaryInput, { marginBottom, borderColor }]}
      />
    </View>
  );
};

export default IconInput;
