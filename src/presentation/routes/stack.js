import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home";
import DetailScreen from "../screens/detail";
import GPSLiveScreen from "../screens/gps-live";
import CreateLineScreen from "../screens/create-line-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getTheme } from "../theme/themes";
import store from "../state-management/store/store";
import { resetPin } from "../state-management/actions/actions";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function RootStack() {
  const themedStyles = styles();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          title: (
            <Image
              source={themedStyles.straightLineLogo}
              style={themedStyles.straightLineLogoLayout}
              resizeMode="contain"
            />
          ),
          headerStyle: themedStyles.headerStyle,
        })}
      />
      <Stack.Screen
        name="CREATE_LINE_SCREEN"
        component={CreateLineScreen}
        options={{
          title: (
            <Image
              source={themedStyles.straightLineLogo}
              style={themedStyles.straightLineLogoLayout}
              resizeMode="contain"
            />
          ),
          headerStyle: themedStyles.headerStyle,
        }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ navigation }) => ({
          title: (
            <Image
              source={themedStyles.straightLineLogo}
              style={themedStyles.straightLineLogoLayout}
              resizeMode="contain"
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={themedStyles.button}
              onPress={() => navigation.navigate("Home")}
            >
              <Image
                source={themedStyles.backArrowIcon}
                style={themedStyles.backArrowLayout}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
          headerStyle: themedStyles.headerStyle,
        })}
      />
      <Stack.Screen
        name="GPSLive"
        component={GPSLiveScreen}
        options={({ navigation }) => ({
          title: (
            <Image
              source={themedStyles.straightLineLogo}
              style={themedStyles.straightLineLogoLayout}
              resizeMode="contain"
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={themedStyles.button}
              onPress={() => navigation.navigate("Detail")}
            >
              <Image
                source={themedStyles.backArrowIcon}
                style={themedStyles.backArrowLayout}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
          headerStyle: themedStyles.headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

export function HomeStack() {
  const themedStyles = styles();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          title: (
            <Image
              source={themedStyles.straightLineLogo}
              style={themedStyles.straightLineLogoLayout}
              resizeMode="contain"
            />
          ),
          headerStyle: themedStyles.headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

export function CreateLineStack() {
  const themedStyles = styles();
  return (
    <Stack.Navigator initialRouteName="CREATE_LINE_SCREEN">
      <Stack.Screen
        name="CreateLineScreen"
        component={CreateLineScreen}
        options={({ navigation, route }) => ({
          title: (
            <Image
              source={themedStyles.straightLineLogo}
              style={themedStyles.straightLineLogoLayout}
              resizeMode="contain"
            />
          ),
          headerStyle: themedStyles.headerStyle,
        })}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ navigation }) => ({
          title: (
            <Image
              source={themedStyles.straightLineLogo}
              style={themedStyles.straightLineLogoLayout}
              resizeMode="contain"
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={themedStyles.button}
              onPress={() => {
                navigation.navigate("CreateLineScreen");
              }}
            >
              <Image
                source={themedStyles.backArrowIcon}
                style={themedStyles.backArrowLayout}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
          headerStyle: themedStyles.headerStyle,
        })}
      />
      <Stack.Screen
        name="GPSLive"
        component={GPSLiveScreen}
        options={({ navigation }) => ({
          title: (
            <Image
              source={themedStyles.straightLineLogo}
              style={themedStyles.straightLineLogoLayout}
              resizeMode="contain"
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={themedStyles.button}
              onPress={() => navigation.navigate("Detail")}
            >
              <Image
                source={themedStyles.backArrowIcon}
                style={themedStyles.backArrowLayout}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
          headerStyle: themedStyles.headerStyle,
        })}
      />
    </Stack.Navigator>
  );
}

export function BottomTab() {
  const themedStyles = styles();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ style: themedStyles.bottomTabBar }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image
                  source={
                    focused == true
                      ? themedStyles.exploreIconFocused
                      : themedStyles.exploreIconUnFocused
                  }
                  style={themedStyles.exploreIconLayout}
                />
                <Text
                  style={[
                    themedStyles.text,
                    {
                      color:
                        focused == true
                          ? themedStyles.textColorFocused
                          : themedStyles.textColorUnFocused,
                    },
                  ]}
                >
                  {"Explore"}
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="CreateLineStack"
        component={CreateLineStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image
                  source={
                    focused == true
                      ? themedStyles.createLineIconFocused
                      : themedStyles.createLineIconUnFocused
                  }
                  style={themedStyles.createLineIconLayout}
                />
                <Text
                  style={[
                    themedStyles.text,
                    {
                      color:
                        focused == true
                          ? themedStyles.textColorFocused
                          : themedStyles.textColorUnFocused,
                    },
                  ]}
                >
                  {"Create line"}
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = () => {
  const theme = getTheme();
  return {
    exploreIconFocused: theme.bottomTabBarExploreIconFocused,
    exploreIconUnFocused: theme.bottomTabBarExploreIconUNFocused,
    createLineIconFocused: theme.bottomTabBarCreateLineIconFocused,
    createLineIconUnFocused: theme.bottomTabBarCreateLineIconUNFocused,
    textColorFocused: theme.bottomTabBarTextColorFocused,
    textColorUnFocused: theme.bottomTabBarTextColorUnFocused,
    backArrowIcon: theme.backArrowIcon,
    straightLineLogo: theme.straightLineLogo,
    bottomTabBar: {
      backgroundColor: theme.primaryColor,
    },
    createLineIconLayout: {
      marginLeft: 10,
      marginTop: 20,
      width: 35,
      height: 35,
    },
    exploreIconLayout: {
      marginTop: 20,
      width: 35,
      height: 35,
    },
    text: {
      textAlign: "center",
      fontSize: 11,
      fontFamily: theme.fontFamily,
    },
    headerStyle: {
      shadowOpacity: 0.4,
      shadowOffset: { height: 2 },
      shadowColor: "black",
      shadowRadius: 5,
      backgroundColor: theme.primaryColor,
    },
    backArrowLayout: {
      marginLeft: 10,
      width: 50,
      height: 50,
    },
    button: {
      flex: 1,
      width: 50,
      height: 50,
      position: "absolute",
    },
    straightLineLogoLayout: {
      width: 200,
      height: 40,
    },
  };
};
