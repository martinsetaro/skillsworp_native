import React, { useCallback } from "react";
import Choice from "./Choice";
import Skill from "./Skill";
import {
  Animated,
  TouchableOpacity,
  Image,
  Text,
  View,
  Platform,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { globalStyles } from "../../styles/globalStyles";
import { ACTION_OFFSET } from "../../utils/constants";
import { colors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

const CardSwipeable = ({ profile, isFirst, swipe, tiltSign, ...rest }) => {
  const navigation = useNavigation();
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  const animatedCardProfileStyles = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const nextOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -25],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            globalStyles.renderChoiceContainer,
            globalStyles.likeContainer,
            {
              opacity: likeOpacity,
            },
          ]}
        >
          <Choice type={"LIKE"} color={0} />
        </Animated.View>
        <Animated.View
          style={[
            globalStyles.renderChoiceContainer,
            globalStyles.nextContainer,
            {
              opacity: nextOpacity,
            },
          ]}
        >
          <Choice type={"NEXT"} color={1} />
        </Animated.View>
      </>
    );
  }, []);

  return (
    <Animated.View
      style={[
        globalStyles.cardProfileContent,
        isFirst && animatedCardProfileStyles,
      ]}
      {...rest}
    >
      <Image
        source={{
          uri: profile.profile_pic
            ? `data:image/gif;base64,${profile.profile_pic}`
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        }}
        style={globalStyles.cardProfileImage}
      />
      <View style={globalStyles.cardProfileInfo}>
        <TouchableOpacity
          style={[
            globalStyles.flexRowCenter,
            { marginBottom: Platform.OS === "android" ? "2%" : "3%" },
          ]}
          onPress={() =>
            navigation.navigate("Profile", { isToMe: false, id: profile.id })
          }
        >
          <Text style={globalStyles.cardProfileName}>{profile.name} </Text>
          <Foundation name="info" size={30} color={colors.backgroundPrimary} />
        </TouchableOpacity>

        <View
          style={[
            globalStyles.flexRowCenter,
            {
              marginBottom: Platform.OS === "android" ? "2%" : "3%",
            },
          ]}
        >
          <Ionicons
            name="location-outline"
            size={20}
            color={colors.backgroundPrimary}
          />
          <Text style={globalStyles.cardProfileLocation}>
            {" "}
            {!profile.address ? "None" : profile.address}
          </Text>
        </View>

        <View style={globalStyles.cardProfileSkillsWrapper}>
          {profile.skills.map((skill) => (
            <Skill type={2} data={skill} key={skill.name} />
          ))}
        </View>
      </View>

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={globalStyles.cardProfileGradient}
      />

      {isFirst && renderChoice()}
    </Animated.View>
  );
};

export default CardSwipeable;
