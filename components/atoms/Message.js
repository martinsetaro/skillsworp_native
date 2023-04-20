import React from "react";
import { Text, View } from "react-native";
import { chatsStyles } from "../../styles/chatsStyles";
import { chatStyles } from "../../styles/chatStyles";

const Message = ({ message, myInfo }) => {
  const isMine = message.sender === myInfo.user.id;
  if (isMine) {
    return (
      <View style={chatStyles.messageMineWrapper}>
        <Text style={chatStyles.textMine}>{message.content}</Text>
      </View>
    );
  } else {
    return (
      <View style={chatStyles.messageOtherWrapper}>
        <Text style={chatStyles.textOther}>{message.content}</Text>
      </View>
    );
  }
};

export default Message;
