import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { H2, P } from "../components/atoms";
import { Button } from "../components/molecules";
import { globalStyles } from "../styles/globalStyles";
import { registrationPsStyles } from "../styles/registrationPsStyles";
import { useDispatch, useSelector } from "react-redux";
import { resetUserReducer, updateProfile } from "../redux/userDucks";
import { DefaultAlert } from "../utils/defaultAlert";
import { colors } from "../styles/colors";

const ProfilePicture = () => {
  const updateInfo = useSelector((state) => state.user);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visibleStatus, setVisibleStatus] = useState(false);

  const [image, setImage] = useState(null);
  const [user, setUser] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      const getUser = async () => {
        const storageUser = await AsyncStorage.getItem("swp_info");
        const jsonUser = JSON.parse(storageUser);
        setUser(jsonUser);
        setImage(jsonUser.user.profile_pic);
      };
      getUser();
    }, [])
  );

  useEffect(() => {
    const handleUpdate = async () => {
      const { infoUpdate, errorMessage } = updateInfo;
      if (!infoUpdate && !errorMessage) {
        return;
      }

      if (errorMessage && !infoUpdate) {
        DefaultAlert("Oopss...", errorMessage);
        setVisibleStatus(false);
        return;
      }

      if (!errorMessage && infoUpdate) {
        const newInfo = user;
        newInfo.user.profile_pic = image;
        await AsyncStorage.setItem("swp_info", JSON.stringify(newInfo));

        setVisibleStatus(false);
        dispatch(resetUserReducer());
        navigation.navigate("Skills");
      }
    };
    handleUpdate();
  }, [updateInfo]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
      base64: true,
    });

    if (!result.cancelled) {
      const fileSize = result.base64.length * (3 / 4) - 2;
      if (fileSize > 600000) {
        DefaultAlert("Ooopss", "The image exceeds 600Kb, select another one");
      } else {
        setImage(result.base64);
      }
    }
  };

  const handleContinue = async () => {
    if (!image) {
      DefaultAlert(
        "Oopsss...",
        "You don't select and image from your gallery. Select one to continue"
      );
      return;
    }
    dispatch(
      updateProfile(
        user.user.id,
        { profile_pic: image.toString() },
        user.tokens.access.token
      )
    );
    setVisibleStatus(true);
  };

  return (
    <View style={registrationPsStyles.containerProfilePicture}>
      <View>
        <H2 plainText="Profile Picture" textAlign="auto" marginBottom={"4%"} />
        <P
          plainText="Select an image from your galllery or take a new photo."
          fontSize={Platform.OS === "android" ? 14 : 16}
          textAlign="auto"
        />
      </View>

      <View style={globalStyles.centerItems}>
        <TouchableOpacity
          style={registrationPsStyles.imagePickerWrapper}
          onPress={pickImage}
        >
          
          <View style={{ height: "100%", width: "100%" }}>
            {image && (
              <Image
                source={{
                  uri: image ? `data:image/gif;base64,${image}` : null,
                }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
          <View style={registrationPsStyles.addImageIconContainer}>
            <AntDesign name="plus" size={18} color="#fafafa" />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <Button
          plainText={
            visibleStatus ? (
              <ActivityIndicator
                size="small"
                color={colors.backgroundPrimary}
                style={{ marginBottom: "5%" }}
              />
            ) : (
              "CONTINUE"
            )
          }
          type={3}
          pressHandler={() => handleContinue()}
          marginBottom={"2.5%"}
        />
        {/*<TextLink
          type={4}
          pressHandler={() => navigation.goBack()}
          plainText="Back"
          fontSize={Platform.OS === "android" ? 15 : 18}
        />*/}
      </View>
    </View>
  );
};

export default ProfilePicture;
