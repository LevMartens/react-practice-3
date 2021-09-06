import { getZoomLevel } from "../generators/zoom-level-generator";
import { pluscodeGeneratorLevel3 } from "../generators/pluscode-lvl-3-generator";
import { getPluscodeFromCoordinates } from "../resources/api/get-pluscode";
import store from "../../presentation/state-management/store/store";
import { sendLineMarkers } from "../../presentation/state-management/actions/actions";
import { getAllLvl3UnderLvl2 } from "../resources/backend/get-all-lvl-3-under-lvl-2";
import { getZoomLevelRules } from "../helpers/if_statements";
import { showBanner } from "../../presentation/components/banner";
import { packLineData } from "../helpers/packers";

//TODO:
/**
 * On large scale you might overuse the google api with region fetching, see if there is an option to put a max distance
 * before fetching, see git commit 'before removing distance between regions'.
 */

let cachedRegion = [];

export async function getLineMarkers(currentRegion) {
  const { latitude, longitude } = currentRegion;
  const zoomLevel = await getZoomLevel(currentRegion);
  const zoomRules = await getZoomLevelRules(zoomLevel);
  const { jumps, zoomedOutToFar } = zoomRules;

  if (zoomedOutToFar) {
    showBanner({
      withTime: true,
      time: 3000,
      message: "Please zoom in to search lines",
    });
    return;
  }

  const pluscode = await getPluscodeFromCoordinates(`${latitude},${longitude}`);

  const pluscodeLvl3 = pluscode.substring(0, 6);

  if (cachedRegion.includes(pluscodeLvl3)) {
    console.log("LOG: Region already fetched. source: get-line-markers.js");
    return;
  }

  showBanner({ withTime: true, time: 3000, message: "Loading lines..." });

  // Region that is visible on the screen in lvl 3 pluscodes
  const regionVisibleOnScreen = await pluscodeGeneratorLevel3(
    pluscodeLvl3,
    jumps
  );

  cachedRegion = cachedRegion.concat(regionVisibleOnScreen);

  // Finding all lvl 3 pluscodes that have this pluscodeLvl2 as parent in dynamoDB
  const pluscodeLvl2 = pluscode.substring(0, 4);

  let listOflvl3Objects = await getAllLvl3UnderLvl2({
    withThisLvl2Pluscode: pluscodeLvl2,
  });

  // All lvl 3 pluscodes that start with this pluscodeLvl2 will be filtered out of the array
  let leftOverRegionVisibleOnScreen = regionVisibleOnScreen.filter(
    (x) => x.substring(0, 4) != pluscodeLvl2
  );

  // For looping to get all the remaining lvl 3 objects from dynamoDB
  if (leftOverRegionVisibleOnScreen.length != 0) {
    for (let x = 0; x < leftOverRegionVisibleOnScreen.length; ) {
      // Getting all lvl 3 pluscodes with the remaining lvl 2 pluscodes that are visible on screen
      let extraListOflvl3Objects = await getAllLvl3UnderLvl2({
        withThisLvl2Pluscode: leftOverRegionVisibleOnScreen[x].substring(0, 4),
      });

      // Adding the extra lvl 3 objects to the listOflvl3Objects now the list is complete
      if (extraListOflvl3Objects.length > 0) {
        listOflvl3Objects = listOflvl3Objects.concat(extraListOflvl3Objects);
      }

      // Filter out this lvl 2 pluscode that we just used to fetch lvl 3 objects with
      leftOverRegionVisibleOnScreen = leftOverRegionVisibleOnScreen.filter(
        (y) =>
          y.substring(0, 4) != leftOverRegionVisibleOnScreen[x].substring(0, 4)
      );
    }
  }

  if (listOflvl3Objects.length < 1) {
    console.log(
      "LOG: No lvl 3 objects (lines) found in dynamoDB. source: get-line-markers.js"
    );
    return;
  }

  // Extracting line objects from lvl 3 objects
  let lineObjects = [];

  listOflvl3Objects.map((object) => {
    lineObjects = lineObjects.concat(object.listOfLines.items);
  });

  // Prepping line marker data to send to MapView
  const lineMarkers = await Promise.all(
    lineObjects.map(async (rawData) => {
      const lineMarkerData = await packLineData(rawData);
      return lineMarkerData;
    })
  );

  store.dispatch(sendLineMarkers(lineMarkers));

  return lineMarkers; // Return for testing
}
