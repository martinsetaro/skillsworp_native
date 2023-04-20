import React, { useEffect } from "react";
import { Image, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import Home from "../screens/Home";
import Chats from "../screens/Chats";
import Filters from "../screens/Filters";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TabNavigation = () => {
  useEffect(() => {
    const loadUserInfo = () => {};
    loadUserInfo();
    return () => {
      
    }
  }, []);

  const Tab = createBottomTabNavigator();
  const handleScreenOptions = ({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
      switch (route.name) {
        case "Home":
          return (
            <SafeAreaView
              style={{
                height: size,
                marginTop: "2%",
                width: size,
              }}
            >
              <Image
                source={require("../assets/img/skilswop-logo.png")}
                style={{ height: "100%", width: "100%" }}
              />
            </SafeAreaView>
          );

        case "Chats":
          iconName = "chatbubble-ellipses-outline";
          break;

          case "Filters":
          iconName = "settings-outline";
          break;
      }
      return (
        <Ionicons
          name={iconName}
          size={size}
          color={color}
          style={{ marginTop: "2%" }}
        />
      );
      
    },
    headerShown: false,
    tabBarActiveTintColor: colors.secondaryColor,
    tabBarInactiveTintColor: colors.thirdColor,
    tabBarActiveBackgroundColor: colors.backgroundPrimary,
    tabBarInactiveBackgroundColor: colors.backgroundPrimary,
    tabBarStyle: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
  });

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={handleScreenOptions}>
      <Tab.Screen name="Home" component={Home} options={{ title: "" }} />
      <Tab.Screen name="Chats" component={Chats} options={{ title: "" }} />
      <Tab.Screen name="Filters" component={Filters} options={{ title: "" }} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
