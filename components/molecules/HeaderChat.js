import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { getUserByIdAPI } from "../../api/users";
import { globalStyles } from "../../styles/globalStyles";
import { H3 } from "../atoms";
const HeaderChat = ({ userId, token }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUserById = async () => {
      const response = await getUserByIdAPI(token, userId);
      setUser(response);
    };
    getUserById();

    return () => {
      setUser({});
    };
  }, []);

  return (
    <View style={globalStyles.headerChat}>
      <Image
        source={{
          uri: !user.profile_pic
            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            : `data:image/gif;base64,${user.profile_pic}`,
        }}
        style={[globalStyles.headerProfileImg, { marginRight: 10 }]}
      />
      <H3 plainText={user.name} textAlign="auto" />
    </View>
  );
};

export default HeaderChat;
