import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/img/logoskilswop.png";
import { Animated, Image, SafeAreaView, View } from "react-native";
import { loadingStyles } from "../styles/loadingStyles";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { loadProfileInfo } from "../redux/userDucks";
import { saveAddress, saveLocation } from "../redux/locationDucks";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Loading = () => {
  const opacityAnim = useRef(new Animated.Value(0.5)).current;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "ErrorPermission",
              params: { permissionDenied: "location" },
            },
          ],
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let regionName = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      const strAddressTmp = `${regionName[0].city}, ${regionName[0].country}`;
      setAddress(strAddressTmp);
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "ErrorPermission",
              params: { permissionDenied: "mediaLibrary" },
            },
          ],
        });
        return;
      }
    })();
  }, []);

  useEffect(() => {
    const redirectWelcome = async () => {
      //await AsyncStorage.removeItem("swp_info");
      if (location && address) {
        const storageUser = await AsyncStorage.getItem("swp_info");
        const jsonUser = JSON.parse(storageUser);
        if (jsonUser) {
          const today = new Date().getTime();
          const tokenTime = new Date(jsonUser.tokens.access.expires).getTime();
          if (tokenTime < today) {
            await AsyncStorage.removeItem("swp_info");
          } else {
            dispatch(loadProfileInfo(jsonUser));
            navigation.reset({
              index: 0,
              routes: [{ name: "TabNavigation" }],
            });
            return;
          }
        }

        dispatch(saveLocation(location));
        dispatch(saveAddress(address));
        navigation.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        });
      }
    };
    redirectWelcome();

    return () => {
      setLocation(null);
    };
  }, [location]);

  return (
    <SafeAreaView style={loadingStyles.container}>
      <Animated.View
        style={[loadingStyles.imgWrapper, { opacity: opacityAnim }]}
      >
        <Image source={logo} style={loadingStyles.logo} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Loading;
