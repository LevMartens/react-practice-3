import { getZoomLevel } from "../generators/zoom-level-generator";

export async function onRegionChange(regionData) {
  console.log(getZoomLevel(regionData));
}
