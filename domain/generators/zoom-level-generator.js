import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("screen").width;

export async function getZoomLevel(regionObject) {
  return Math.log2(360 * (screenWidth / 256 / regionObject.longitudeDelta)) + 1;
}
