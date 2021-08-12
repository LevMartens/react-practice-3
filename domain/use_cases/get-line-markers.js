import { getZoomLevel } from "../generators/zoom-level-generator";
import { pluscodeGeneratorLevel3 } from "../generators/pluscode-lvl-3-generator";
import { getPluscodeFromCoordinates } from "../resources/api/get-pluscode";
import { getNumberMarkerImage } from "../helpers/switch_cases";
import store from "../../presentation/state-management/store/store";
import { sendLineMarkers } from "../../presentation/state-management/actions/actions";
import { getAllLvl3UnderLvl2 } from "../resources/graphql/get-all-lvl-3-under-lvl-2";
import {
  convertZoomLvlToJumpsFor,
  getZoomLevelRules,
} from "../helpers/if_statements";
import { getDistanceBetween } from "../generators/distance-generator";
import { showBanner } from "../../presentation/components/banner";
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from "../resources/environment/dimensions";
import image from "../../assets/lineMarker.png";

//TODO Test fetch of one line successful, add more lines and test again
//TODO improve performance
//TODO implement snackbar for loading lines and zooming out
//TODO only get line markers when certain distance has been passed and not zoom lvl
//TODO cleanup code

//! 13.4 Assign variables where you need them, but place them in a reasonable place.
//! 13.6 Avoid using unary increments and decrements (++, --).  use i += 1
//! 15.1 Use === and !== over == and !=.
//! 15.3 Use shortcuts for booleans, but explicit comparisons for strings and numbers.

let cachedRegion = []; // Level 3 pluscodes

export async function getLineMarkers(previousRegion, currentRegion) {
  const { latitude, longitude } = currentRegion;
  const zoomLevel = await getZoomLevel(currentRegion);
  const zoomRules = await getZoomLevelRules(zoomLevel);
  const { minDistanceToContinue, zoomedOutToFar } = zoomRules;

  if (zoomedOutToFar) {
    showBanner({
      withTime: true,
      time: 3000,
      message: "Please zoom in to search lines",
    });
    console.log(
      "MESSAGE: Zoomed out to far on map. source: get-line-markers.js"
    );
    return;
  }

  // const distanceBetweenRegions = await getDistanceBetween(
  //   previousRegion,
  //   currentRegion
  // );

  // if (distanceBetweenRegions < minDistanceToContinue) {
  //   console.log(
  //     "MESSAGE: Not getting linemarkers, not enough change in between regions: " +
  //       distanceBetweenRegions +
  //       " meters"
  //   );
  //   return;
  // }

  const pluscode = await getPluscodeFromCoordinates(`${latitude},${longitude}`);

  const pluscodeLvl3 = pluscode.substring(0, 6);

  if (cachedRegion.includes(pluscodeLvl3)) {
    console.log("MESSAGE: Region already fetched. source: get-line-markers.js");
    return;
  }

  showBanner({ withTime: true, time: 3000, message: "Loading lines..." });

  //var image = await getNumberMarkerImage(1);
  //var lineObjects = [];
  //* let lineObjects;
  //var lineMarkers = [];
  //let regionVisibleOnScreen = [];

  // Region that is visible on the screen in lvl 3 pluscodes
  const jumps = await convertZoomLvlToJumpsFor(
    "REGION_VISIBLE_ON_SCREEN",
    zoomLevel
  );

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
      "MESSAGE: No lvl 3 objects (lines) found in dynamoDB. source: get-line-markers.js"
    );
    return;
  }

  // Extracting line objects from lvl 3 objects
  let lineObjects = [];

  listOflvl3Objects.map((object) => {
    lineObjects = lineObjects.concat(object.listOfLines.items);
  });

  // Prepping line marker data to send to MapView
  const lineMarkers = lineObjects.map((object) => {
    const coordinates = {
      latitude: parseFloat(object.startingCoordinates.lat),
      longitude: parseFloat(object.startingCoordinates.lng),
    };

    const markerRegion = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    const lineMarkerData = {
      isLoaded: true,
      rawLineData: object,
      image: image,
      coordinates: coordinates,
      markerRegion: markerRegion,
    };
    return lineMarkerData;
  });

  store.dispatch(sendLineMarkers(lineMarkers));
}
