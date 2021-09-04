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
import { createLineDraft } from "../../domain/use_cases/create-line-draft";
import { showAddLineTitleAlert } from "../../domain/resources/environment/alerts";

export default function PinSetButton({ navigation }) {
  const themedStyles = styles();

  const pinState = useSelector((state) => state.setPin);

  //TODO move these 3 to the createLineDraft function so you don't have to pass in any arg

  const title = useSelector((state) => state.lineTitleHandler);

  const firstPinCoordinates = useSelector(
    (state) => state.mapPressHandlerFirstPin
  );
  const secondPinCoordinates = useSelector(
    (state) => state.mapPressHandlerSecondPin
  );

  const pinButtonPressed = async () => {
    if (pinState == "Set starting point") {
      store.dispatch(setPinStartingPoint());
    }
    if (pinState == "Set end point") {
      store.dispatch(setPinEndPoint());
      showAddLineTitleAlert();
    }

    if (pinState == "Done!") {
      store.dispatch(resetPin());

      createLineDraft(firstPinCoordinates, secondPinCoordinates, title);
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
