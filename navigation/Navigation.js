import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BackButton, Header, HeaderChat } from "../components/molecules";
import TabNavigation from "./TabNavigation";
import { colors } from "../styles/colors";
import { useSelector } from "react-redux";
import Loading from "../screens/Loading";
import Welcome from "../screens/Welcome";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import RecoverPassword from "../screens/RecoverPassword";
import CodeConfirmation from "../screens/CodeConfirmation";
import ProfilePicture from "../screens/ProfilePicture";
import Skills from "../screens/Skills";
import Profile from "../screens/Profile";
import EditInfo from "../screens/EditInfo";
import ErrorPermissions from "../screens/ErrorPermissions";
import Chat from "../screens/Chat";
import EmailSent from "../screens/EmailSent";
import MyNameIs from "../screens/MyNameIs";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const userInfo = useSelector((state) => state.user.myInfo);
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = () => {
      if (!userInfo) {
        return;
      }
      setUser(userInfo);
    };
    getUser();
  }, [userInfo]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Group>
          {/* LOAD DATA */}
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ErrorPermission"
            component={ErrorPermissions}
            options={{ headerShown: false }}
          />
        </Stack.Group>

        <Stack.Group>
          {/* MENU SIGNIN-SIGNUP-RECOVERPASS */}
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={({ navigation, route }) => ({
              title: "",
              headerTransparent: true,
              headerShadowVisible: false,
              headerLeft: () => <BackButton navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={({ navigation, route }) => ({
              title: "",
              headerTransparent: true,
              headerShadowVisible: false,
              headerLeft: () => <BackButton navigation={navigation} />,
            })}
          />

          <Stack.Screen
            name="MyNameIs"
            component={MyNameIs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecoverPassword"
            component={RecoverPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EmailSent"
            component={EmailSent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CodeConfirmation"
            component={CodeConfirmation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfilePicture"
            component={ProfilePicture}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Skills"
            component={Skills}
            options={{ headerShown: false }}
          />
        </Stack.Group>

        <Stack.Group>
          {/* MAIN CONTENT */}
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={({ navigation, route }) => ({
              headerTitle: (props) => <Header userInfo={!user ? {} : user} />,
              headerTransparent: false,
              headerStyle: {
                backgroundColor: colors.backgroundSecondary,
              },
              headerShadowVisible: false,
            })}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={({ navigation, route }) => ({
              title: "",
              headerTransparent: true,
              headerShadowVisible: false,
              headerLeft: () => <BackButton navigation={navigation} />,
            })}
          />

          <Stack.Screen
            name="Chat"
            component={Chat}
            options={({ navigation, route }) => {
              const userId = route.params.id;
              const token = userInfo.tokens.access.token;
              return {
                title: "",
                headerTitleAlign: "center",
                headerShadowVisible: true,
                headerStyle: {
                  backgroundColor: colors.backgroundPrimary,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.32,
                  shadowRadius: 5.46,

                  elevation: 9,
                },
                headerTextStyle: {
                  textAlign: "center",
                  flexGrow: 1,
                },
                headerTitle: (props) => (
                  <HeaderChat userId={!userId ? "" : userId} token={token} />
                ),
                headerLeft: () => (
                  <BackButton navigation={navigation} type={2} />
                ),
                headerBackVisible: false,
              };
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditInfo}
            options={({ navigation, route }) => ({
              title: "",
              headerTransparent: true,
              headerShadowVisible: false,
              headerLeft: () => <BackButton navigation={navigation} />,
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
