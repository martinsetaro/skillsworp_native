import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Modal, TouchableWithoutFeedback, View } from "react-native";
import { getUserByIdAPI } from "../../api/users";
import { colors } from "../../styles/colors";
import { globalStyles } from "../../styles/globalStyles";
import { modalStyles } from "../../styles/matchModal";
import { H2, P } from "../atoms";
import Button from "./Button";
const MatchModal = ({
  myInfo,
  idMatched,
  handleHideModal,
  setModalVisible,
}) => {
  const [userMatched, setUserMatched] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const getUser = async () => {
      const token = myInfo.tokens.access.token;
      const response = await getUserByIdAPI(token, idMatched);
      setUserMatched(response);
    };
    getUser();
  }, []);

  const handleCheckChats = () => {
    setModalVisible(false);
    navigation.navigate("Chats");
  };
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <TouchableWithoutFeedback onPress={() => handleHideModal()}>
        <View style={modalStyles.container}>
          <View style={modalStyles.titleWrapper}>
            <H2
              color={colors.secondaryColor}
              plainText="It's a match"
              textAlign="auto"
              marginBottom={"4%"}
            />
            <P
              plainText={`You and ${
                userMatched ? userMatched.name : "Feliciano"
              } have liked each other`}
              fontSize={Platform.OS === "android" ? 14 : 16}
              textAlign="center"
            />
          </View>
          <View style={modalStyles.imagesWrapper}>
            <View style={modalStyles.image}>
              <Image
                source={{
                  uri: !myInfo.user.profile_pic
                    ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    : `data:image/gif;base64,${myInfo.user.profile_pic}`,
                }}
                style={globalStyles.fullSize}
              />
            </View>

            <View style={modalStyles.image}>
              <Image
                source={{
                  uri:
                    !userMatched || !userMatched.profile_pic
                      ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      : `data:image/gif;base64,${userMatched.profile_pic}`,
                }}
                style={globalStyles.fullSize}
              />
            </View>
          </View>
          <View>
            <Button
              type={3}
              plainText="Check your chats"
              pressHandler={() => handleCheckChats("Chats")}
              marginBottom={"3%"}
            />
            <Button
              type={2}
              plainText="Keep swiping"
              pressHandler={() => setModalVisible(false)}
              marginBottom={"3%"}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MatchModal;
