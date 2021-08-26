import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SCREEN_WIDTH } from "../../domain/resources/environment/dimensions";
import { useSelector } from "react-redux";
import { getTheme } from "../theme/themes";
import {
  setPinStartingPoint,
  setPinEndPoint,
  resetPin,
} from "../state-management/actions/actions";
import store from "../state-management/store/store";
import { createLine } from "../../domain/use_cases/create-line";

export default function PinSetButton({ navigation }) {
  const themedStyles = styles();

  const pinState = useSelector((state) => state.setPin);

  const firstPinCoordinates = useSelector(
    (state) => state.mapPressHandlerFirstPin
  );
  const secondPinCoordinates = useSelector(
    (state) => state.mapPressHandlerSecondPin
  );

  const pinButtonPressed = () => {
    if (pinState == "Set starting point") {
      store.dispatch(setPinStartingPoint());
    }
    if (pinState == "Set end point") {
      store.dispatch(setPinEndPoint());
    }

    if (pinState == "Done!") {
      store.dispatch(resetPin());

      createLine(firstPinCoordinates, secondPinCoordinates);
      navigation.navigate("Detail");
    }
  };

  return (
    <TouchableOpacity
      style={themedStyles.button}
      onPress={() => pinButtonPressed()}
    >
      <Text style={themedStyles.text}>{pinState}</Text>
    </TouchableOpacity>
  );
}

const styles = () => {
  const theme = getTheme();
  return StyleSheet.create({
    button: {
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 50,
      backgroundColor: theme.buttonColor,
      width: SCREEN_WIDTH,
      bottom: 0,
      height: 100,
      position: "absolute",
    },
    text: {
      paddingBottom: 20,
      color: theme.textColor,
      textAlign: "center",
      fontSize: 25,
      fontFamily: theme.fontFamily,
    },
  });
};
