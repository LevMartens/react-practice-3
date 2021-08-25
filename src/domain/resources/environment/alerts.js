import { Alert } from "react-native";

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
