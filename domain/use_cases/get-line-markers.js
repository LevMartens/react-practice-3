import { getZoomLevel } from "../generators/zoom-level-generator";
import { pluscodeGeneratorLevel3 } from "../generators/pluscode-generator-lvl-3";
import { pluscodeGeneratorLevel2 } from "../generators/pluscode-generator-lvl-2";
import { getPluscodeFromCoordinates } from "../resources/api/get-pluscode";
import { getNumberMarkerImage } from "../helpers/switch_cases";
import store from "../../presentation/state-management/store/store";
import { sendLineMarkers } from "../../presentation/state-management/actions/actions";
import React from "react";
import { Marker } from "react-native-maps";
import { Image, Dimensions } from "react-native";
import { getAllLvl3UnderLvl2 } from "../resources/graphql/get-all-lvl-3-under-lvl-2";
import { getAllLvl2UnderLvl1 } from "../resources/graphql/get-all-lvl-2-under-lvl-1";
import { convertZoomLvlToJumpsFor } from "../helpers/if_statements";
//import { animate } from "../../presentation/components/map-view-home";

//TODO Fine tune line marker overlap when zoom lvl <5

//!TEST
var previousRegion = [];

export async function getLineMarkers(regionData, t15, mapView) {
  console.log(" A --------------------------------------------------------");
  var t16 = performance.now();
  console.log("Time to start function " + (t16 - t15) + " milliseconds");

  const zoomLevel = await getZoomLevel(regionData);
  console.log("Zoom level " + zoomLevel);

  var regionVisibleOnScreen = []; // Region that is visible on the screen in either lvl 3 or lvl 2 pluscodes
  var weUseLvl3Pluscodes = false;
  var weUseLvl2Pluscodes = false;
  var regionVisibleOnScreenJumps = await convertZoomLvlToJumpsFor(
    "REGION_VISIBLE_ON_SCREEN",
    zoomLevel
  );

  var regionToMergeJumps = await convertZoomLvlToJumpsFor(
    "REGION_TO_MERGE",
    zoomLevel
  );

  const pluscode = await getPluscodeFromCoordinates(
    `${regionData.latitude},${regionData.longitude}`
  );

  const pluscodeLvl3 = pluscode.substring(0, 6);
  const pluscodeLvl2 = pluscode.substring(0, 4);
  const pluscodeLvl1 = pluscode.substring(0, 2);

  //!TEST
  var newPreviousRegion = [];

  if (zoomLevel < 7.5) {
    regionVisibleOnScreen = await pluscodeGeneratorLevel2(
      pluscodeLvl2,
      regionVisibleOnScreenJumps
    );
    weUseLvl2Pluscodes = true;
    //!TEST
    console.log(
      "length Before Previous filter " + regionVisibleOnScreen.length
    );
    newPreviousRegion = regionVisibleOnScreen;
    //x != previousRegion[i]
    //for (let i = 0; i < previousRegion.length; i++) {
    regionVisibleOnScreen = regionVisibleOnScreen.filter(
      (x) => !previousRegion.includes(x)
    );
    //}
    console.log("length After Previous filter " + regionVisibleOnScreen.length);
  }

  if (zoomLevel > 7.5) {
    var t0 = performance.now();
    console.log(pluscodeLvl3 + " " + regionVisibleOnScreenJumps + " jumps");

    regionVisibleOnScreen = await pluscodeGeneratorLevel3(
      pluscodeLvl3,
      regionVisibleOnScreenJumps
    );
    //!TEST
    console.log(
      "length Before Previous filter " + regionVisibleOnScreen.length
    );
    newPreviousRegion = regionVisibleOnScreen;
    //x != previousRegion[i]
    //for (let i = 0; i < previousRegion.length; i++) {
    regionVisibleOnScreen = regionVisibleOnScreen.filter(
      (x) => !previousRegion.includes(x)
    );
    //}
    console.log("length After Previous filter " + regionVisibleOnScreen.length);

    var t1 = performance.now();
    console.log("Plucodegeneratorlvl3 " + (t1 - t0) + " milliseconds");
    weUseLvl3Pluscodes = true;
  }

  //*_____________________________________________________________________

  if (weUseLvl3Pluscodes) {
    //!TEST
    // // Finding all lvl 3 pluscodes that have this pluscodeLvl2 as parent in dynamoDB
    // var listOflvl3Objects = await getAllLvl3UnderLvl2({
    //   withThisLvl2Pluscode: pluscodeLvl2,
    // });

    // // All lvl 3 pluscodes that start with this pluscodeLvl2 will be filtered out of the array
    // var leftOverRegionVisibleOnScreen = regionVisibleOnScreen.filter(
    //   (x) => x.substring(0, 4) != pluscodeLvl2
    // );

    var leftOverRegionVisibleOnScreen = regionVisibleOnScreen;
    var listOflvl3Objects = [];

    var t111 = performance.now();
    // For looping to get all the remaining lvl 3 objects from dynamoDB
    if (leftOverRegionVisibleOnScreen.length != 0) {
      for (var x = 0; x < leftOverRegionVisibleOnScreen.length; ) {
        // Getting all lvl 3 pluscodes with the remaining lvl 2 pluscodes that are visible on screen
        var extraListOflvl3Objects = await getAllLvl3UnderLvl2({
          withThisLvl2Pluscode: leftOverRegionVisibleOnScreen[x].substring(
            0,
            4
          ),
        });

        // Adding the extra lvl 3 objects to the listOflvl3Objects now the list is complete
        if (extraListOflvl3Objects.length > 0) {
          listOflvl3Objects = listOflvl3Objects.concat(extraListOflvl3Objects);
        }

        // Filter out this lvl 2 pluscode that we just used to fetch lvl 3 objects with
        leftOverRegionVisibleOnScreen = leftOverRegionVisibleOnScreen.filter(
          (y) =>
            y.substring(0, 4) !=
            leftOverRegionVisibleOnScreen[x].substring(0, 4)
        );
      }
    }
    var t222 = performance.now();
    console.log("Leftovers " + (t222 - t111) + " milliseconds");
    var t333 = performance.now();
    console.log("listOflvl3Objects.length " + listOflvl3Objects.length);
    // Creating the markers for mapview with the lvl 3 objects data
    if (listOflvl3Objects.length > 0) {
      var lineMarkers = [];

      for (let x = 0; x < listOflvl3Objects.length; x++) {
        //!TEST disabled merging for test
        // // Here we merge markers that got too close to eachother when the user zoomed out
        // var regionToMerge = await pluscodeGeneratorLevel3(
        //   listOflvl3Objects[x].completePluscode,
        //   regionToMergeJumps
        // );

        // // Finding the lvl 3 object that we want to merge with to prevent it from merging with itself
        // const aIndex = regionToMerge.findIndex(
        //   (i) => i === listOflvl3Objects[x].completePluscode
        // );

        // // Removing the lvl 3 object that we want to merge with from the regionToMergeArray
        // if (aIndex > -1) {
        //   regionToMerge.splice(aIndex, 1);
        // }

        // // Merging
        // for (let y = 0; y < regionToMerge.length; y++) {
        //   // Checking if any of the lvl 3 objects in listOflvl3Objects lay in the region to merge
        //   const index = listOflvl3Objects.findIndex(
        //     (i) => i.completePluscode === regionToMerge[y]
        //   );

        //   // If there was a lvl 3 object found in the merge region we merge it
        //   if (index > -1) {
        //     listOflvl3Objects[x].numberOfLines =
        //       listOflvl3Objects[x].numberOfLines +
        //       listOflvl3Objects[index].numberOfLines;

        //     listOflvl3Objects.splice(index, 1);
        //   }
        // }

        var t444 = performance.now();
        console.log("Merging " + (t444 - t333) + " milliseconds");

        if (zoomLevel < 12.8698) {
          // Creating single line marker & total line marker components
          var image = await getNumberMarkerImage(
            listOflvl3Objects[x].numberOfLines
          );

          var coordinates = {
            latitude: parseFloat(listOflvl3Objects[x].middleCoord.lat),
            longitude: parseFloat(listOflvl3Objects[x].middleCoord.lng),
          };

          const { width, height } = Dimensions.get("window");
          const ASPECT_RATIO = width / height;
          const LATITUDE_DELTA = 0.2;
          const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

          let markerRegion = {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };

          var lvl3PluscodeObject = {
            isLoaded: true,
            rawPluscodeData: listOflvl3Objects[x],
            image: image,
            coordinates: coordinates,
            markerRegion: markerRegion,
          };
          lineMarkers.push(lvl3PluscodeObject);
        }

        if (zoomLevel > 12.8698) {
          // creating ONLY single line marker components
          for (
            let k = 0;
            k < listOflvl3Objects[x].listOfLines.items.length;
            k++
          ) {
            var image = await getNumberMarkerImage(1);

            var coordinates = {
              latitude: parseFloat(
                listOflvl3Objects[x].listOfLines.items[k].startingCoordinates
                  .lat
              ),
              longitude: parseFloat(
                listOflvl3Objects[x].listOfLines.items[k].startingCoordinates
                  .lng
              ),
            };

            var lvl3PluscodeObject = {
              isLoaded: true,
              rawPluscodeData: listOflvl3Objects[x],
              image: image,
              coordinates: coordinates,
              markerRegion: markerRegion,
            };
            lineMarkers.push(lvl3PluscodeObject);
          }
        }
      }
      console.log("double " + lineMarkers.length);
      store.dispatch(sendLineMarkers(lineMarkers));
      //!TEST
      previousRegion = newPreviousRegion;
    }
  }

  //*_____________________________________________________________________

  if (weUseLvl2Pluscodes) {
    var listOflvl2Objects = await getAllLvl2UnderLvl1(pluscodeLvl1);

    var leftOverRegionVisibleOnScreen = regionVisibleOnScreen.filter(
      (x) => x.substring(0, 2) != pluscodeLvl1
    );

    if (leftOverRegionVisibleOnScreen.length != 0) {
      for (var x = 0; x < leftOverRegionVisibleOnScreen.length; ) {
        var extraListOflvl2Objects = await getAllLvl2UnderLvl1(
          leftOverRegionVisibleOnScreen[x].substring(0, 2)
        );

        if (extraListOflvl2Objects.length > 0) {
          listOflvl2Objects = listOflvl2Objects.concat(extraListOflvl2Objects);
        }

        leftOverRegionVisibleOnScreen = leftOverRegionVisibleOnScreen.filter(
          (z) =>
            z.substring(0, 2) !=
            leftOverRegionVisibleOnScreen[x].substring(0, 2)
        );
      }
    }

    if (listOflvl2Objects.length > 0) {
      var lineMarkers = [];

      for (let x = 0; x < listOflvl2Objects.length; x++) {
        var regionToMerge = await pluscodeGeneratorLevel2(
          listOflvl2Objects[x].completePluscode,
          regionToMergeJumps
        );

        const aindex = regionToMerge.findIndex(
          (i) => i === listOflvl2Objects[x].completePluscode
        );

        if (aindex > -1) {
          regionToMerge.splice(aindex, 1);
        }

        for (let c = 0; c < regionToMerge.length; c++) {
          const index = listOflvl2Objects.findIndex(
            (j) => j.completePluscode === regionToMerge[c]
          );

          if (index > -1) {
            listOflvl2Objects[x].numberOfLines =
              listOflvl2Objects[x].numberOfLines +
              listOflvl2Objects[index].numberOfLines;

            listOflvl2Objects.splice(index, 1);
          }
        }

        var image = await getNumberMarkerImage(
          listOflvl2Objects[x].numberOfLines
        );

        var coordinates = {
          latitude: parseFloat(listOflvl2Objects[x].middleCoord.lat),
          longitude: parseFloat(listOflvl2Objects[x].middleCoord.lng),
        };

        const { width, height } = Dimensions.get("window");
        const ASPECT_RATIO = width / height;
        const LATITUDE_DELTA = 2.6;
        const LONGITUDE_DELTA = 0.009; //LATITUDE_DELTA * ASPECT_RATIO;

        let markerRegion = {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        var lvl2PluscodeObject = {
          isLoaded: true,
          rawPluscodeData: listOflvl2Objects[x],
          image: image,
          coordinates: coordinates,
          markerRegion: markerRegion,
        };
        lineMarkers.push(lvl2PluscodeObject);
      }

      store.dispatch(sendLineMarkers(lineMarkers));
    }
  }
  var t17 = performance.now();
  console.log("Complete function time " + (t17 - t15) + " milliseconds");
  console.log(" B --------------------------------------------------------");
}
