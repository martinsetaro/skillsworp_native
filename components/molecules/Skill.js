import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { colors } from "../../styles/colors";
import { globalStyles } from "../../styles/globalStyles";
const Skill = ({
  data,
  type,
  handleOnPress,
  handleChangeSkillColor = null,
  isActive,
}) => {
  const [active, setActive] = useState(isActive);
  // ACTIVO SECONDARY DESACTIVADO BACKGROUND PRIMARY Y PRIMARYCOLOR
  switch (type) {
    case 1:
      return (
        <TouchableOpacity
          style={[
            globalStyles.skillWrapper,
            {
              backgroundColor: active
                ? colors.secondaryColor
                : colors.backgroundPrimary,
              borderColor: active ? colors.secondaryColor : colors.primaryColor,
            },
          ]}
          onPress={() => {
            handleOnPress();
            handleChangeSkillColor(active, setActive);
          }}
        >
          <Text
            style={[
              globalStyles.skillLabel,
              {
                color: active ? colors.backgroundPrimary : colors.primaryColor,
              },
            ]}
          >
            {data.name}
          </Text>
        </TouchableOpacity>
      );

    case 2:
      return (
        <TouchableOpacity style={globalStyles.skillSecondaryWrapper}>
          <Text style={globalStyles.skillSecondaryLabel}>{data.name}</Text>
        </TouchableOpacity>
      );
    case 3:
      return (
        <TouchableOpacity style={globalStyles.skillThirdWrapper}>
          <Text style={globalStyles.skillThirdLabel}>{data.name}</Text>
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity style={globalStyles.skillWrapper}>
          <Text style={globalStyles.skillLabel}>{data.name}</Text>
        </TouchableOpacity>
      );
  }
};

export default Skill;
