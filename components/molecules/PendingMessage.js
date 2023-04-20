import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { chatsStyles } from "../../styles/chatsStyles";
import { H4, P } from "../atoms";
const PendingMessage = ({ item, pressHandler }) => {
  return (
    <TouchableOpacity
      style={chatsStyles.pendingMessageWrapper}
      onPress={() => pressHandler(item.profile.id, item.key, item.id)}
    >
      <View style={chatsStyles.imageWrapper}>
        <Image
          source={{
            uri: !item.profile.profile_pic
              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              : `data:image/gif;base64,${item.profile.profile_pic}`,
          }}
          style={chatsStyles.imagePendMessage}
        />
      </View>
      <View style={chatsStyles.descMessageWrapper}>
        <H4
          plainText={item.profile.name}
          textAlign="auto"
          marginBottom={Platform.OS === "android" ? "2%" : "3%"}
        />
        <P
          plainText={item.last_message}
          fontSize={Platform.OS === "android" ? 12 : 13}
          textAlign="auto"
        />
      </View>
    </TouchableOpacity>
  );
};

export default PendingMessage;
