import { useColorScheme } from "react-native";

export function theme() {
  const themeMode = useColorScheme();
  return themeMode == "light" ? lightTheme : darkTheme;
}

const lightTheme = {
  primaryColor: "#3A6351",
  buttonColor: "#c84b31",
  secondaryColor: "#284538",
  backgroundColor: "#284538",
  textColor: "#fff5eb",
  fontFamily: "Evolventa",
};

const darkTheme = {
  primaryColor: "#284538",
  buttonColor: "#c84b31",
  secondaryColor: "#284538",
  backgroundColor: "#284538",
  textColor: "#fff5eb",
  fontFamily: "Evolventa",
};

//export const theme = themeMode == "light" ? lightTheme : darkTheme;
//export default theme;
