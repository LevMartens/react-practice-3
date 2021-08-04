import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./presentation/state-management/store/store";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Home from "./presentation/screens/home";
import { NavigationContainer } from "@react-navigation/native";
import { RootStack, BottomTab } from "./presentation/routes/stack";
import * as Location from "expo-location";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import * as Application from "expo-application";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { createLine } from "./domain/use_cases/create-line";
import { RootSiblingParent } from "react-native-root-siblings";
Amplify.configure(awsconfig);

export default function App() {
  let [fontsLoaded] = useFonts({
    Evolventa: require("./assets/fonts/Evolventa-Regular.otf"),
  });
  useEffect(() => {
    // createLine(
    //   "4RJ65X",
    //   { lat: -37.377772, lng: 144.17816 },
    //   { lat: -37.898932, lng: 145.073875 }
    // );
  }, []);

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
