import { SCREEN_WIDTH } from "../resources/environment/dimensions";

export async function getZoomLevel(regionObject) {
  const { longitudeDelta } = regionObject;
  const zoomLvl = Math.log2(360 * (SCREEN_WIDTH / 256 / longitudeDelta)) + 1;
  const fixedZoomLvl = zoomLvl.toFixed(1);
  return fixedZoomLvl;
}
