import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { getConversations } from "../api/chats";
import { H3, IconInput } from "../components/atoms";
import { MatchImage, PendingMessage } from "../components/molecules";
import { chatsStyles } from "../styles/chatsStyles";
import { colors } from "../styles/colors";
const Chats = () => {
  const myInfo = useSelector((state) => state.user.myInfo);
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [conversations, setConversations] = useState({});
  useFocusEffect(
    React.useCallback(() => {
      const loadConversations = async () => {
        if (!myInfo) return;
        const token = myInfo.tokens.access.token;
        const response = await getConversations(token);
        setConversations(response);
      };
      loadConversations();
    }, [myInfo])
  );

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", handlerHideKeyboardInput);
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
      setIsVisible(false);
    };
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

  const navChatById = (id, keyRelationship, idConversation) => {
    navigation.navigate("Chat", { id, keyRelationship, idConversation });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? null : "padding"}
      style={chatsStyles.container}
    >
      <TouchableWithoutFeedback onPress={handleDisappearImage}>
        <View style={chatsStyles.contentWrapper}>
          <View style={chatsStyles.chatWrapper}>
            <View style={chatsStyles.sectionWrapper}>
              {/* SEARCH */}
              <IconInput
                name="search"
                color={colors.primaryColor}
                size={20}
                onChangeText={(text) => console.log(text)}
                onFocus={handlerFocusInput}
                value={""}
              />
            </View>

            <View style={chatsStyles.chatsSection}>
              {/* messages */}
              <H3
                plainText="Your matches"
                textAlign="auto"
                marginBottom={Platform.OS === "android" ? "4%" : "5%"}
              />
              <FlatList
                data={
                  Object.keys(conversations).length <= 0
                    ? []
                    : conversations.results
                }
                renderItem={({ item }) => (
                  <PendingMessage item={item} pressHandler={navChatById} />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Chats;
