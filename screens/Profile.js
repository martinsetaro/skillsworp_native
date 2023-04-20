import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Alert, Image, View } from "react-native";
import { ContentProfile, TextLink } from "../components/molecules";
import { profileStyles } from "../styles/profileStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { loadProfileInfo, logOut, updateProfile } from "../redux/userDucks";
import { DefaultAlert } from "../utils/defaultAlert";
import { getUserByIdAPI } from "../api/users";

const Profile = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { params } = useRoute();

  const [profileType, setProfileType] = useState(false);
  const [userDiff, setUserDiff] = useState({});
  const [image, setImage] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const renderProfile = async () => {
        if (!params) return;

        if (params.isToMe === true) {
          setProfileType(1);
        } else {
          // get info by id
          const token = user.myInfo.tokens.access.token;
          const response = await getUserByIdAPI(token, params.id);
          setUserDiff(response);
          setProfileType(2);
        }
      };

      renderProfile();
    }, [params])
  );

  useFocusEffect(
    React.useCallback(() => {
      const renderInfo = async () => {
        if (!profileType) return;

        const profile_pic = user.myInfo.user.profile_pic;
        if (profileType === 1) {
          setImage(profile_pic);
        }
      };
      renderInfo();
    }, [profileType])
  );

  useEffect(() => {
    const handleUpdate = async () => {
      const { infoUpdate, errorMessage } = user;
      if (!infoUpdate && !errorMessage) {
        return;
      }

      if (errorMessage && !infoUpdate) {
        DefaultAlert("Oopss...", errorMessage);
        return;
      }

      if (!errorMessage && infoUpdate) {
        const newInfo = user;
        newInfo.myInfo.user.profile_pic = image;
        await AsyncStorage.setItem(
          "swp_info",
          JSON.stringify({
            user: newInfo.myInfo.user,
            tokens: newInfo.myInfo.tokens,
          })
        );

        dispatch(
          loadProfileInfo({
            user: newInfo.myInfo.user,
            tokens: newInfo.myInfo.tokens,
          })
        );
      }
    };
    handleUpdate();
  }, [user]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
      base64: true,
    });

    if (!result.cancelled) {
      const fileSize = result.base64.length * (3 / 4) - 2;
      if (fileSize > 600000) {
        DefaultAlert("Ooopss", "The image exceeds 600Kb, select another one");
      } else {
        setImage(result.base64);
        dispatch(
          updateProfile(
            user.myInfo.user.id,
            { profile_pic: result.base64 },
            user.myInfo.tokens.access.token
          )
        );
      }
    }
  };

  const handleLogOut = async () => {
    const storageUser = await AsyncStorage.getItem("swp_info");
    const jsonUser = JSON.parse(storageUser);
    const refreshToken = jsonUser.tokens.refresh.token;
    dispatch(logOut(refreshToken));
    await AsyncStorage.removeItem("swp_info");
    navigation.reset({
      index: 0,
      routes: [{ name: "Loading" }],
    });
  };

  const showAlertChangeImage = () =>
    Alert.alert(
      "Your profile picture will be changed once you save",
      "Are you sure to proceed?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => pickImage() },
      ]
    );

  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.shapeWrapper}>
        <Image
          source={require("../assets/img/shape-2.png")}
          style={profileStyles.shape}
        />
      </View>

      <View style={profileStyles.profileInfoWrapper}>
        {params ? (
          profileType == 1 ? (
            <ContentProfile
              type={1}
              pressHandlerEdit={() => navigation.navigate("EditProfile")}
              pressHandlerSkills={() => navigation.navigate("Skills")}
              pressHandlerImages={() => showAlertChangeImage()}
              item={user.myInfo.user}
              image={
                !image
                  ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  : `data:image/gif;base64,${image}`
              }
            />
          ) : (
            <ContentProfile
              type={2}
              item={userDiff}
              image={
                !image
                  ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  : `data:image/gif;base64,${image}`
              }
            />
          )
        ) : null}

        <View style={profileStyles.logOutWrapper}>
          {profileType && profileType == 1 ? (
            <TextLink
              type={5}
              fontSize={18}
              plainText="Log Out"
              pressHandler={() => handleLogOut()}
            />
          ) : (
            <Image
              source={require("../assets/img/logo-arriba.png")}
              style={profileStyles.logoFooter}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
