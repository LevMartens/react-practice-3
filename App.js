import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/presentation/state-management/store/store";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTab } from "./src/presentation/routes/stack";
import { ActivityIndicator } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { RootSiblingParent } from "react-native-root-siblings";

//TODO 3.4 Use property value shorthand. eslint: & 3.5 Group your shorthand properties at the beginning of your object declaration.
//TODO create a new type draftLines and use it with @auth, add "where" to type line to query lines created by user
//TODO in create line create linedraft instead of line, create line when line is walked using linedraft
//TODO create test.js for create-public-line.js and get-line-markers.js
//TODO make coordinates in db the same as marker coordinates type eg lat lng to latitude longitude
//TODO test if removing postionWatcher this way works
//TODO place markers based on current position (create-line)
//getPositionOnce(); //TODO this function bypasses use_cases in map-view-explore
//TODO make up the model when there are public lines
//TODO create button to start directions (mv-gps-live)
//TODO screen doesn't follow curser (mv-gps-live)
//TODO show something that indicates recording is going on (mv-gps-live)
//getPositionOnce(); //TODO this function bypasses use_cases (mv-gps-live)
//watchHeading(); //TODO this function bypasses use_cases (mv-gps-live)
//TODO give aSingleCurrentPosition an "isLoaded" and render MapViewCreateLine conditionally (create-line-screen)
//TODO test if the shorthand version works on combined reducers

Amplify.configure(awsconfig);

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
            </NavigationContainer>
          </PaperProvider>
        </RootSiblingParent>
      </Provider>
    );
  }
}
