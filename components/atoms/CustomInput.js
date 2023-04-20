import React from "react";
import { TextInput } from "react-native";
import { colors } from "../../styles/colors";
import { globalStyles } from "../../styles/globalStyles";

const CustomInput = ({
  onChangeText,
  onFocus,
  value,
  placeholder,
  keyboardType = "default",
  textContentType = "none",
  marginBottom = 0,
  borderColor = colors.primaryColor,
  maxLength = 255,
  isPassword = false,
  type = 1,
  autoFocus = false,
}) => {
  switch (type) {
    case 1:
      return (
        <TextInput
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          onFocus={onFocus}
          //onBlur={onBlur}
          value={value}
          //disableFullscreenUI={true}
          //onKeyPress={onKeyPress}
          placeholder={placeholder}
          maxLength={maxLength}
          placeholderTextColor={colors.primaryColor}
          keyboardType={keyboardType}
          textContentType={textContentType}
          secureTextEntry={isPassword}
          style={[globalStyles.primaryInput, { marginBottom, borderColor }]}
        />
      );

    case 2:
      return (
        <TextInput
          onChangeText={onChangeText}
          onFocus={onFocus}
          //onBlur={onBlur}
          value={value}
          //disableFullscreenUI={true}
          //onKeyPress={onKeyPress}
          placeholder={placeholder}
          placeholderTextColor={colors.backgroundPrimary}
          keyboardType={keyboardType}
          style={[globalStyles.thirdInput, { marginBottom, borderColor }]}
        />
      );

    default:
      return (
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
          style={[globalStyles.primaryInput, { marginBottom, borderColor }]}
        />
      );
  }
};

export default CustomInput;
