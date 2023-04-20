import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { chatsStyles } from "../../styles/chatsStyles";
import { globalStyles } from "../../styles/globalStyles";
const MatchImage = ({ item, pressHandler }) => {
  return (
    <TouchableOpacity
      style={chatsStyles.matchWrapper}
      onPress={() => pressHandler(item.id)}
    >
      <Image
        source={{ uri: item.image }}
        style={[globalStyles.fullSize, chatsStyles.matchRadius]}
      />
    </TouchableOpacity>
  );
};

export default MatchImage;
