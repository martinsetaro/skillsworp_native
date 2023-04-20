import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";

const Header = ({ userInfo }) => {
  const navigation = useNavigation();
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  useEffect(() => {
    const loadImage = () => {
      if (Object.keys(userInfo).length <= 0) {
        return;
      }
      if (userInfo.user.profile_pic) {
        setImage(`data:image/gif;base64,${userInfo.user.profile_pic}`);
      } else {
        setImage(
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        );
      }
    };
    loadImage();
  }, [userInfo]);

  return (
    <SafeAreaView style={globalStyles.header}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile", { isToMe: true })}
      >
        <Image
          source={{
            uri: image,
          }}
          style={[globalStyles.headerProfileImg]}
        />
      </TouchableOpacity>

      <View>
        <Image
          source={require("../../assets/img/logo-arriba.png")}
          style={globalStyles.headerLogo}
        />
      </View>
      <View></View>
    </SafeAreaView>
  );
};

export default Header;
