import { useColorScheme } from "react-native";
import exploreImageFocusedLight from "../../assets/map-outline3.png";
import exploreImageUNFocusedLight from "../../assets/map-outline1.png";
import createLineFocusedLight from "../../assets/map-marker-distance10.png";
import createLineUNFocusedLight from "../../assets/map-marker-distance5.png";
import backArrowIconLight from "../../assets/backArrowNar.png";
import straightLineLogoLight from "../../assets/StraightLineLogoT.png";

export function getTheme() {
  const themeMode = useColorScheme();
  return themeMode == "light" ? lightTheme : darkTheme;
}

export const lightTheme = {
  primaryColor: "#3A6351",
  buttonColor: "#c84b31",
  tertiaryColor: "black",
  secondaryColor: "#284538",
  backgroundColor: "#284538",
  textColor: "#fff5eb",
  fontFamily: "Evolventa",
  bannerTextColor: "#ffffff",
  bannerBackgroundColor: "black",
  containerBackgroundColor: "#808893",
  bottomTabBarExploreIconFocused: exploreImageFocusedLight,
  bottomTabBarExploreIconUNFocused: exploreImageUNFocusedLight,
  bottomTabBarCreateLineIconFocused: createLineFocusedLight,
  bottomTabBarCreateLineIconUNFocused: createLineUNFocusedLight,
  bottomTabBarTextColorFocused: "white",
  bottomTabBarTextColorUnFocused: "black",
  backArrowIcon: backArrowIconLight,
  straightLineLogo: straightLineLogoLight,
};

export const darkTheme = {
  primaryColor: "#284538",
  buttonColor: "#c84b31",
  secondaryColor: "#284538",
  backgroundColor: "#284538",
  tertiaryColor: "#323232",
  textColor: "#fff5eb",
  fontFamily: "Evolventa",
  bannerTextColor: "#ffffff",
  bannerBackgroundColor: "black",
  containerBackgroundColor: "#2C394B",
  bottomTabBarExploreIconFocused: exploreImageFocusedLight,
  bottomTabBarExploreIconUNFocused: exploreImageUNFocusedLight,
  bottomTabBarCreateLineIconFocused: createLineFocusedLight,
  bottomTabBarCreateLineIconUNFocused: createLineUNFocusedLight,
  bottomTabBarTextColorFocused: "white",
  bottomTabBarTextColorUnFocused: "black",
  backArrowIcon: backArrowIconLight,
  straightLineLogo: straightLineLogoLight,
};
