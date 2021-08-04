import { getZoomLevel } from "../generators/zoom-level-generator";
import { pluscodeGeneratorLevel3 } from "../generators/pluscode-generator-lvl-3";
import { pluscodeGeneratorLevel2 } from "../generators/pluscode-generator-lvl-2";
import { getPluscodeFromCoordinates } from "../resources/api/get-pluscode";
import { getNumberMarkerImage } from "../helpers/switch_cases";
import store from "../../presentation/state-management/store/store";
import Toast from "react-native-root-toast";
import { debounce, throttle } from "lodash";
import {
  sendLineMarkers,
  openBanner,
} from "../../presentation/state-management/actions/actions";
import React from "react";
import { Marker } from "react-native-maps";
import { Image, Dimensions } from "react-native";
import { getAllLvl3UnderLvl2 } from "../resources/graphql/get-all-lvl-3-under-lvl-2";
import { getAllLvl2UnderLvl1 } from "../resources/graphql/get-all-lvl-2-under-lvl-1";
import { convertZoomLvlToJumpsFor } from "../helpers/if_statements";
import { getDistanceBetween } from "../generators/distance-generator";
//import { animate } from "../../presentation/components/map-view-home";

//TODO Test fetch of one line successful, add more lines and test again
//TODO improve performance
//TODO implement snackbar for loading lines and zooming out
//TODO only get line markers when certain distance has been passed and not zoom lvl
//TODO cleanup code

const showBanner = throttle(function () {
  store.dispatch(openBanner(true));
  setTimeout(function hideBanner() {
    store.dispatch(openBanner(false));
  }, 3000);
}, 0);

export async function getLineMarkers(previousRegion, currentRegion, t15) {
  var distanceBetweenCurrentAndPreviousRegion = getDistanceBetween(
    previousRegion,
    currentRegion
  );
  console.log("dis: " + distanceBetweenCurrentAndPreviousRegion);

  if (distanceBetweenCurrentAndPreviousRegion < 50) {
    console.log(
      "weShouldNotGetLineMarkers distance: " +
        distanceBetweenCurrentAndPreviousRegion
    );
    return;
  }

  showBanner();

  console.log(" A --------------------------------------------------------");
  var t16 = performance.now();
  console.log("Time to start function " + (t16 - t15) + " milliseconds");

  const zoomLevel = await getZoomLevel(currentRegion);
  console.log("Zoom level " + zoomLevel);

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.2;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  var image = await getNumberMarkerImage(1);
  var lineObjects = [];
  var lineMarkers = [];
  var regionVisibleOnScreen = []; // Region that is visible on the screen in either lvl 3 or lvl 2 pluscodes

  var regionVisibleOnScreenJumps = await convertZoomLvlToJumpsFor(
    "REGION_VISIBLE_ON_SCREEN",
    zoomLevel
  );

  const pluscode = await getPluscodeFromCoordinates(
    `${currentRegion.latitude},${currentRegion.longitude}`
  );

  const pluscodeLvl3 = pluscode.substring(0, 6);
  const pluscodeLvl2 = pluscode.substring(0, 4);

  console.log("NN " + pluscodeLvl2 + "-" + pluscodeLvl3);

  if (zoomLevel < 7.5) {
    console.log(
      "ERROR: Zoomed out to far on map. source: get-line-markers.js line 52"
    );
    return;
  }

  console.log(pluscodeLvl3 + " " + regionVisibleOnScreenJumps + " jumps");

  regionVisibleOnScreen = await pluscodeGeneratorLevel3(
    pluscodeLvl3,
    regionVisibleOnScreenJumps
  );

  // Finding all lvl 3 pluscodes that have this pluscodeLvl2 as parent in dynamoDB
  var listOflvl3Objects = await getAllLvl3UnderLvl2({
    withThisLvl2Pluscode: pluscodeLvl2,
  });

  // All lvl 3 pluscodes that start with this pluscodeLvl2 will be filtered out of the array
  var leftOverRegionVisibleOnScreen = regionVisibleOnScreen.filter(
    (x) => x.substring(0, 4) != pluscodeLvl2
  );

  // For looping to get all the remaining lvl 3 objects from dynamoDB
  if (leftOverRegionVisibleOnScreen.length != 0) {
    for (var x = 0; x < leftOverRegionVisibleOnScreen.length; ) {
      // Getting all lvl 3 pluscodes with the remaining lvl 2 pluscodes that are visible on screen
      var extraListOflvl3Objects = await getAllLvl3UnderLvl2({
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
      "ERROR: No lvl 3 objects found. source: get-line-markers.js line 95"
    );
    return;
  }

  // Extracting line objects from lvl 3 objects
  listOflvl3Objects.map((object) => {
    lineObjects = lineObjects.concat(object.listOfLines.items);
  });

  // Prepping line marker data to send to MapView
  lineMarkers = lineObjects.map((object) => {
    var coordinates = {
      latitude: parseFloat(object.startingCoordinates.lat),
      longitude: parseFloat(object.startingCoordinates.lng),
    };

    let markerRegion = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    var lineMarkerData = {
      isLoaded: true,
      rawLineData: object,
      image: image,
      coordinates: coordinates,
      markerRegion: markerRegion,
    };
    return lineMarkerData;
  });

  store.dispatch(sendLineMarkers(lineMarkers));

  var t17 = performance.now();
  console.log("Complete function time " + (t17 - t15) + " milliseconds");
  console.log(" B --------------------------------------------------------");
}
