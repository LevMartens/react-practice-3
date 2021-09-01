import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/presentation/state-management/store/store";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Home from "./src/presentation/screens/home";
import { NavigationContainer } from "@react-navigation/native";
import { RootStack, BottomTab } from "./src/presentation/routes/stack";
import * as Location from "expo-location";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import * as Application from "expo-application";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { createLine } from "./src/domain/use_cases/create-line";
import { RootSiblingParent } from "react-native-root-siblings";
import { getElevation } from "./src/domain/resources/api/get-elevation";
import { gt } from "./test";
import { LONGITUDE_DELTA } from "./src/domain/resources/environment/dimensions";

//TODO 3.4 Use property value shorthand. eslint: & 3.5 Group your shorthand properties at the beginning of your object declaration.
//TODO create a new type draftLines and use it with @auth, add "where" to type line to query lines created by user
//TODO in create line create linedraft instead of line, create line when line is walked using linedraft

Amplify.configure(awsconfig);
const Melbourne = {
  latitude: -37.840935,
  longitude: 144.946457,
};

const Carlton = {
  latitude: -37.794932,
  longitude: 144.973475,
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Evolventa: require("./assets/fonts/Evolventa-Regular.otf"),
  });

  useEffect(() => {}, []);

  if (!fontsLoaded) {
    return (
      <View style={{ justifyContent: "center" }}>
        <ActivityIndicator animating={true} color={"#c84b31"} size={"large"} />
      </View>
    );
  } else {
    return (
      <Provider store={store}>
        <RootSiblingParent>
          <PaperProvider>
            <NavigationContainer>
              <BottomTab></BottomTab>
              {/* <RootStack> </RootStack> */}
            </NavigationContainer>
          </PaperProvider>
        </RootSiblingParent>
      </Provider>
    );
  }
}
