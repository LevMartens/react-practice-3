import { SCREEN_WIDTH } from "../resources/environment/dimensions";

export async function getZoomLevel(regionObject) {
  let zoomLvl =
    Math.log2(360 * (SCREEN_WIDTH / 256 / regionObject.longitudeDelta)) + 1;
  let fixedZoomLvl = zoomLvl.toFixed(1);
  return fixedZoomLvl;
}
