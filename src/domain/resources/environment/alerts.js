import { Alert } from "react-native";
import { addLineTitle } from "../../../presentation/state-management/actions/actions";
import store from "../../../presentation/state-management/store/store";

export function showAlert(message) {
  Alert.alert(
    "Something went wrong!",
    message,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ],
    { cancelable: true }
  );
}

export function showAddLineTitleAlert() {
  const buttons = [
    {
      text: "Add",
      onPress: (userInput) => store.dispatch(addLineTitle(userInput)),
      style: "default",
    },
  ];
  Alert.prompt("Give your line a name", "", buttons);
}
