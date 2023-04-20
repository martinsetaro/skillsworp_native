import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Animated, PanResponder, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import {
  Button,
  CardSwipeable,
  DecisionBar,
  TextLink,
} from "../components/molecules";
import { homeStyles } from "../styles/homeStyles";
import { ACTION_OFFSET, CARDPROPS } from "../utils/constants";
import { colors } from "../styles/colors";
import { getUsers, postLikeAPI } from "../api/like";
import { H1, P } from "../components/atoms";
import MatchModal from "../components/molecules/MatchModal";
import { globalStyles } from "../styles/globalStyles";

const Home = () => {
  const myInfo = useSelector((state) => state.user);
  const [profiles, setProfiles] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [idMatched, setIdMatched] = useState();
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadUsers = async () => {
      const token = myInfo.myInfo.tokens.access.token;
      const response = await getUsers(token, page);
      const totalPages = Math.ceil(response.totalResults/response.limit)
      setPage(response.page);
      setTotalPages(totalPages);
      setProfiles(response.results);
      setIsLoading(false);
    };
    loadUsers();
  }, [page]);

  useEffect(() => {
    if (profiles && profiles.length == 0 && page < totalPages) {
      setPage(page + 1);
      setIsLoading(true);
    }
  }, [profiles]);

  const panResponder = (profile) =>
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy, y0 }) => {
        swipe.setValue({ x: dx, y: dy });
        tiltSign.setValue(y0 > CARDPROPS.height / 2 ? 1 : -1);
      },
      onPanResponderRelease: async (_, { dx, dy }) => {
        const direction = Math.sign(dx);
        const isActionActivate = Math.abs(dx) > ACTION_OFFSET;
        if (isActionActivate) {
          Animated.spring(swipe, {
            duration: 200,
            toValue: {
              x: direction * CARDPROPS.out_of_screen,
              y: dy,
            },
            useNativeDriver: true,
          }).start(removeTopCard);
          if (dx > 0) {
            const token = myInfo.myInfo.tokens.access.token;
            const idKey =
              profile.name.toLowerCase() < myInfo.myInfo.user.name.toLowerCase()
                ? `${profile.id}_${myInfo.myInfo.user.id}`
                : `${myInfo.myInfo.user.id}_${profile.id}`;
            const response = await postLikeAPI(token, idKey);
            if (response.like_count > 1) {
              setIdMatched(profile.id);
              setModalVisible(true);
            }
          }
        } else {
          Animated.spring(swipe, {
            toValue: {
              x: 0,
              y: 0,
            },
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    });

  const removeTopCard = useCallback(() => {
    setProfiles((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    async (direction, profiles) => {
      Animated.timing(swipe.x, {
        toValue: direction * CARDPROPS.out_of_screen,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
      if (direction > 0) {
        const profile = profiles[0];
        const token = myInfo.myInfo.tokens.access.token;

        const idKey =
          profile.name.toLowerCase() < myInfo.myInfo.user.name.toLowerCase()
            ? `${profile.id}_${myInfo.myInfo.user.id}`
            : `${myInfo.myInfo.user.id}_${profile.id}`;
        const response = await postLikeAPI(token, idKey);
        if (response.like_count > 1) {
          setIdMatched(profile.id);
          setModalVisible(true);
        }
      }
    },
    [swipe, removeTopCard]
  );

  const handleReload = () => {
    setPage(1);
    setIsLoading(true);
  };
  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.cardSwipeWrapper}>
        {/* 1 === NEXT && 0 === LIKE */}
        {modalVisible && idMatched && (
          <MatchModal
            myInfo={myInfo.myInfo}
            idMatched={idMatched}
            handleHideModal={() => setModalVisible(false)}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
        )}
        {profiles && profiles.length <= 0 && page === totalPages ? (
          <View style={[globalStyles.fullSize, globalStyles.centerItems]}>
            <H1 plainText={"Ooops!"} marginBottom={"3%"} />
            <P
              plainText={
                "There’s no one around you. Reload to see if there are new people."
              }
              textAlign="center"
              fontSize={16}
              marginBottom={"4%"}
            />
            {isLoading && (
              <ActivityIndicator size="small" color={colors.primaryColor} />
            )}
            <Button
              type={5}
              plainText={"Reload"}
              pressHandler={() => handleReload()}
            />
          </View>
        ) : null}
        {profiles && !isLoading ? (
          profiles
            .map((profile, idx) => {
              const isFirst = idx === 0;
              const dragHandlers = isFirst
                ? panResponder(profile).panHandlers
                : {};
              return (
                <CardSwipeable
                  key={profile.email}
                  swipe={swipe}
                  tiltSign={tiltSign}
                  profile={profile}
                  isFirst={isFirst}
                  {...dragHandlers}
                />
              );
            })
            .reverse()
        ) : (
          <ActivityIndicator size="small" color={colors.primaryColor} />
        )}
        {profiles && profiles.length > 0 && !isLoading ? (
          <DecisionBar handleChoice={handleChoice} profiles={profiles} />
        ) : null}
      </View>
    </View>
  );
};

export default Home;
