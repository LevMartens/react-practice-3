import * as React from "react";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Icon,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home";
import DetailScreen from "../screens/detail";
import GPSLiveScreen from "../screens/gpsLive";
import AddLineScreen from "../screens/add-line-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
//"#484848"
//"#3A6351"

export function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          title: (
            <Image
              source={require("../../assets/StraightLineLogoT.png")}
              style={{
                width: 200,
                height: 40,
              }}
              resizeMode="contain"
            />
          ),
          headerStyle: {
            shadowOpacity: 0.4,
            shadowOffset: { height: 2 },
            shadowColor: "black",
            shadowRadius: 5,

            backgroundColor: "#3A6351",
          },
        })}
      />
      <Stack.Screen
        name="ADD_LINE_SCREEN"
        component={AddLineScreen}
        options={{
          title: (
            <Image
              source={require("../../assets/StraightLineLogoT.png")}
              style={{
                width: 200,
                height: 40,
              }}
              resizeMode="contain"
            />
          ),
          headerStyle: {
            shadowOpacity: 0.4,
            shadowOffset: { height: 2 },
            shadowColor: "black",
            shadowRadius: 5,

            backgroundColor: "#3A6351",
          },
        }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ navigation, route }) => ({
          title: (
            <Image
              source={require("../../assets/StraightLineLogoT.png")}
              style={{
                width: 200,
                height: 40,
              }}
              resizeMode="contain"
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Home")}
            >
              <Image
                source={require("../../assets/backArrowNar.png")}
                style={{
                  marginLeft: 10,
                  width: 50,
                  height: 50,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#3A6351",
          },
        })}
      />
      <Stack.Screen
        name="GPSLive"
        component={GPSLiveScreen}
        options={({ navigation, route }) => ({
          title: (
            <Image
              source={require("../../assets/StraightLineLogoT.png")}
              style={{
                width: 200,
                height: 40,
              }}
              resizeMode="contain"
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Detail")}
            >
              <Image
                source={require("../../assets/backArrowNar.png")}
                style={{
                  marginLeft: 10,
                  width: 50,
                  height: 50,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            shadowOpacity: 0.4,
            shadowOffset: { height: 2 },
            shadowColor: "black",
            shadowRadius: 5,
            backgroundColor: "#3A6351",
          },
        })}
      />
    </Stack.Navigator>
  );
}

export function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          title: (
            <Image
              source={require("../../assets/StraightLineLogoT.png")}
              style={{
                width: 200,
                height: 40,
              }}
              resizeMode="contain"
            />
          ),
          headerStyle: {
            shadowOpacity: 0.4,
            shadowOffset: { height: 2 },
            shadowColor: "black",
            shadowRadius: 5,

            backgroundColor: "#3A6351",
          },
        })}
      />
    </Stack.Navigator>
  );
}

export function AddLineStack() {
  return (
    <Stack.Navigator initialRouteName="ADD_LINE_SCREEN">
      <Stack.Screen
        name="AddLineScreen"
        component={AddLineScreen}
        options={({ navigation, route }) => ({
          title: (
            <Image
              source={require("../../assets/StraightLineLogoT.png")}
              style={{
                width: 200,
                height: 40,
              }}
              resizeMode="contain"
            />
          ),
          headerStyle: {
            shadowOpacity: 0.4,
            shadowOffset: { height: 2 },
            shadowColor: "black",
            shadowRadius: 5,

            backgroundColor: "#3A6351",
          },
        })}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ navigation, route }) => ({
          title: (
            <Image
              source={require("../../assets/StraightLineLogoT.png")}
              style={{
                width: 200,
                height: 40,
              }}
              resizeMode="contain"
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Home")}
            >
              <Image
                source={require("../../assets/backArrowNar.png")}
                style={{
                  marginLeft: 10,
                  width: 50,
                  height: 50,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#3A6351",
          },
        })}
      />
      <Stack.Screen
        name="GPSLive"
        component={GPSLiveScreen}
        options={({ navigation, route }) => ({
          title: (
            <Image
              source={require("../../assets/StraightLineLogoT.png")}
              style={{
                width: 200,
                height: 40,
              }}
              resizeMode="contain"
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Detail")}
            >
              <Image
                source={require("../../assets/backArrowNar.png")}
                style={{
                  marginLeft: 10,
                  width: 50,
                  height: 50,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            shadowOpacity: 0.4,
            shadowOffset: { height: 2 },
            shadowColor: "black",
            shadowRadius: 5,
            backgroundColor: "#3A6351",
          },
        })}
      />
    </Stack.Navigator>
  );
}

export function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ style: { backgroundColor: "#3A6351" } }}
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
                      ? require("../../assets/map-outline3.png")
                      : require("../../assets/map-outline1.png")
                  }
                  style={{
                    marginTop: 20,
                    width: 35,
                    height: 35,
                  }}
                />
                <Text
                  style={{
                    color: focused == true ? "white" : "black",
                    textAlign: "center",
                    fontSize: 11,
                    fontFamily: "Evolventa",
                  }}
                >
                  {"Explore"}
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="AddLineStack"
        component={AddLineStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image
                  source={
                    focused == true
                      ? require("../../assets/map-marker-distance10.png")
                      : require("../../assets/map-marker-distance5.png")
                  }
                  style={{
                    marginLeft: 10,
                    marginTop: 20,
                    width: 35,
                    height: 35,
                  }}
                />
                <Text
                  style={{
                    color: focused == true ? "white" : "black",
                    textAlign: "center",
                    fontSize: 11,
                    fontFamily: "Evolventa",
                  }}
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

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#d8b384",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    flex: 1,
    width: 50,
    height: 50,
    position: "absolute",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 10,
    fontFamily: "Evolventa",
  },
});
