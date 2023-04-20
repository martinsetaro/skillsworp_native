import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { profileStyles } from "../../styles/profileStyles";
import { globalStyles } from "../../styles/globalStyles";
import Button from "./Button";
import Skill from "./Skill";
import InfoSection from "./InfoSection";
import { H3, P } from "../atoms";
import { colors } from "../../styles/colors";

const ContentProfile = ({
  type,
  pressHandlerEdit = null,
  pressHandlerSkills = null,
  pressHandlerImages = null,
  image,
  item,
}) => {
  switch (type) {
    case 1:
      return (
        <View style={profileStyles.profileInfo}>
          <View style={[globalStyles.centerItems, { marginBottom: "10%" }]}>
            <TouchableOpacity
              style={profileStyles.imagePickerWrapper}
              onPress={pressHandlerImages}
            >
              <View
                style={[globalStyles.fullSize, profileStyles.imagePickerView]}
              >
                <Image
                  style={globalStyles.fullSize}
                  source={{
                    uri: image,
                  }}
                />
              </View>
              <View style={profileStyles.addImageIconContainer}>
                <AntDesign name="plus" size={18} color="#fafafa" />
              </View>
            </TouchableOpacity>
            <H3 plainText={item.name} textAlign="center" marginBottom={"2%"} />

            <View style={profileStyles.cityWrapper}>
              <Ionicons
                name="location-outline"
                size={Platform.OS === "android" ? 14 : 16}
                color={colors.thirdColor}
              />
              <P
                plainText={" " + item.address ? item.address : "Unknwon"}
                fontSize={Platform.OS === "android" ? 14 : 16}
                textAlign="center"
              />
            </View>
          </View>

          <View>
            <Button
              type={3}
              plainText="Edit profile info"
              pressHandler={pressHandlerEdit}
              marginBottom={"3%"}
            />
            <Button
              type={2}
              plainText="Change skills"
              pressHandler={pressHandlerSkills}
              marginBottom={"3%"}
            />
          </View>
        </View>
      );

    case 2:
      return (
        <View style={profileStyles.profileInfo}>
          <View
            style={[
              globalStyles.centerItems,
              { marginBottom: Platform.OS === "ios" ? "3%" : "1.5%" },
            ]}
          >
            <View
              style={[
                profileStyles.imagePickerWrapper,
                { marginBottom: Platform.OS === "ios" ? "3%" : "1.5%" },
              ]}
            >
              <View style={profileStyles.imagePickerView}>
                <Image
                  style={globalStyles.fullSize}
                  source={{
                    uri: !item.profile_pic
                      ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      : `data:image/gif;base64,${item.profile_pic}`,
                  }}
                />
              </View>
            </View>

            <H3 plainText={item.name} textAlign="center" />
          </View>

          <InfoSection title="Phone" description={item.phone} />
          <InfoSection
            title="Location"
            description={item.address ? item.address : "Unknwon"}
          />

          <SafeAreaView>
            <H3 plainText="Skills" textAlign="auto" marginBottom={"2%"} />
            <FlatList
              data={item.skills}
              renderItem={({ item }) => <Skill data={item} type={3} />}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
          </SafeAreaView>
        </View>
      );

    default:
      return (
        <View style={profileStyles.profileInfo}>
          <View style={[globalStyles.centerItems, { marginBottom: "10%" }]}>
            <TouchableOpacity
              style={profileStyles.imagePickerWrapper}
              onPress={pressHandlerImages}
            >
              <View
                style={[globalStyles.fullSize, profileStyles.imagePickerView]}
              >
                <Image style={globalStyles.fullSize} source={{ uri: image }} />
              </View>
              <View style={profileStyles.addImageIconContainer}>
                <AntDesign name="plus" size={18} color="#fafafa" />
              </View>
            </TouchableOpacity>
            <H3
              plainText="Eric Martinez"
              textAlign="auto"
              marginBottom={"2%"}
            />
          </View>

          <View>
            <Button
              type={3}
              plainText="Edit profile info"
              pressHandler={pressHandlerEdit}
              marginBottom={"3%"}
            />
            <Button
              type={2}
              plainText="Change skills"
              pressHandler={pressHandlerSkills}
              marginBottom={"3%"}
            />
          </View>
        </View>
      );
  }
};

export default ContentProfile;
