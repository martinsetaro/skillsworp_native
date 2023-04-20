import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { getMessages, postMessageAPI } from "../api/chats";
import { CustomInput, Message } from "../components/atoms";
import { Button } from "../components/molecules";
import { chatStyles } from "../styles/chatStyles";
import { DefaultAlert } from "../utils/defaultAlert";
const Chat = () => {
  const myInfo = useSelector((state) => state.user.myInfo);
  const { params } = useRoute();
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [sentMessage, setSentMessage] = useState(false);
  const messagesFlatList = useRef(null);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", handlerHideKeyboardInput);
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
      setIsVisible(false);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const loadConversations = async () => {
        if (!myInfo || !params) return;
        const token = myInfo.tokens.access.token;
        const response = await getMessages(token, params.idConversation, page);
        setMessages(response);
      };
      loadConversations();
    }, [myInfo])
  );

  useEffect(() => {
    const loadNewMessage = async () => {
      if (!myInfo || !params) return;
      if (sentMessage) {
        const token = myInfo.tokens.access.token;
        const response = await getMessages(token, params.idConversation, page);
        setMessages(response);
      }
    };
    loadNewMessage();
  }, [myInfo, sentMessage]);

  useEffect(() => {
    const changePage = () => {
      //setPage(page + 1);
    };
    changePage();
  }, []);

  const handleDisappearImage = () => {
    Keyboard.dismiss();
    setIsVisible(false);
  };

  const handlerFocusInput = () => {
    setIsVisible(true);
  };

  const handlerHideKeyboardInput = () => {
    setIsVisible(false);
  };

  const handleChangeMessage = (text) => {
    setContent(text);
  };

  const handleSubmitMessage = async () => {
    if (!content) {
      DefaultAlert("Ooopss", "You forgot to write a message");
      return;
    }
    const token = myInfo.tokens.access.token;
    const messageContent = {
      relationship: params.idConversation,
      content,
    };

    await postMessageAPI(token, params.keyRelationship, messageContent);
    setSentMessage(true);
    setSentMessage(false);
    setContent("");
    handleDisappearImage();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={chatStyles.container}
    >
      <TouchableWithoutFeedback
        onPress={handleDisappearImage}
        style={chatStyles.touchableWrapper}
      >
        <View style={chatStyles.chatContent}>
          <View
            style={[
              chatStyles.chatWrapper,
              {
                height: !isVisible
                  ? "95%"
                  : Platform.OS === "ios"
                  ? "80%"
                  : "90%",
              },
            ]}
          >
            <FlatList
              ref={messagesFlatList}
              data={messages ? messages.results : []}
              renderItem={({ item }) => (
                <Message message={item} myInfo={myInfo ? myInfo : {}} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View
            style={[
              chatStyles.inputWrapper,
              {
                height: !isVisible
                  ? "5%"
                  : Platform.OS === "ios"
                  ? "20%"
                  : "10%",
                flexGrow: 1,
              },
            ]}
          >
            <CustomInput
              type={2}
              onChangeText={handleChangeMessage}
              onFocus={handlerFocusInput}
              value={content}
              placeholder="Type a messag"
              textContentType="password"
            />
            <Button
              plainText="SEND"
              type={4}
              pressHandler={handleSubmitMessage}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Chat;
