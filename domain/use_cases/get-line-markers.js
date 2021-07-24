import { getZoomLevel } from "../generators/zoom-level-generator";
import { pluscodeGeneratorLevel3 } from "../generators/pluscode-generator-lvl-3";
import { pluscodeGeneratorLevel2 } from "../generators/pluscode-generator-lvl-2";
import { getPluscodeFromCoordinates } from "../resources/api/get-pluscode";
import { getMarkerDataLvl3 } from "../resources/graphql/get-marker-data-lvl-3";
import { NumberOfLinesMarker } from "../../presentation/components/lines-nearby";
import { getNumberMarkerImage } from "../helpers/switch_cases";
import store from "../../presentation/state-management/store/store";
import { sendLineMarkers } from "../../presentation/state-management/actions/actions";
import React from "react";
import { Marker } from "react-native-maps";
import { Image } from "react-native";
import { getAllLvl3UnderLvl2 } from "../resources/graphql/get-all-lvl-3-under-lvl-2";
import { getAllLvl2UnderLvl1 } from "../resources/graphql/get-all-lvl-2-under-lvl-1";

//TODO Fine tune line marker overlap when zoom lvl <5

export async function getLineMarkers(regionData) {
  var pluscodesArray = [];

  const pluscode = await getPluscodeFromCoordinates(
    `${regionData.latitude},${regionData.longitude}`
  );

  const pluscodeLvl3 = pluscode.substring(0, 6);
  const pluscodeLvl2 = pluscode.substring(0, 4);
  const pluscodeLvl1 = pluscode.substring(0, 2);

  const zoomLevel = await getZoomLevel(regionData);
  console.log("Zoom lvl " + zoomLevel);

  if (zoomLevel > 12.8698) {
    // Retreiving all Line Markers.

    pluscodesArray = await pluscodeGeneratorLevel3(pluscodeLvl3, 1);
  }

  if (zoomLevel < 12.8698 && zoomLevel > 12.6769) {
    // Retreiving Line Markers 1 jump (lvl3) from the screen centre lvl 3 pluscode.

    pluscodesArray = await pluscodeGeneratorLevel3(pluscodeLvl3, 1);
  }

  if (zoomLevel < 12.6769 && zoomLevel > 12.4) {
    // Retreiving Line Markers 2 jumps (lvl3) from the screen centre lvl 3 pluscode.

    pluscodesArray = await pluscodeGeneratorLevel3(pluscodeLvl3, 2);
  }

  if (zoomLevel < 12.4 && zoomLevel > 10) {
    // Retreiving Line Markers 3 jumps (lvl3) from the screen centre lvl 3 pluscode.

    pluscodesArray = await pluscodeGeneratorLevel3(pluscodeLvl3, 3);
  }

  if (zoomLevel < 10 && zoomLevel > 7.5) {
    // Retreiving Line Markers 10 jumps (lvl3) from the screen centre lvl 3 pluscode.

    pluscodesArray = await pluscodeGeneratorLevel3(pluscodeLvl3, 10);
  }

  if (zoomLevel < 7.5 && zoomLevel > 6.5) {
    // Retreiving Line Markers 1 jump (lvl2) from the screen centre lvl 2 pluscode.

    pluscodesArray = await pluscodeGeneratorLevel2(pluscodeLvl2, 1);
  }

  if (zoomLevel < 6.5 && zoomLevel > 5.5) {
    // Retreiving Line Markers 3 jumps (lvl2) from the screen centre lvl 2 pluscode.

    pluscodesArray = await pluscodeGeneratorLevel2(pluscodeLvl2, 3);
  }

  if (zoomLevel < 5.5 && zoomLevel > 4) {
    // Retreiving Line Markers 5 jumps (lvl2) from the screen centre lvl 2 pluscode.

    pluscodesArray = await pluscodeGeneratorLevel2(pluscodeLvl2, 5);
  }

  if (zoomLevel < 4) {
    // Retreiving Line Markers 10 jumps (lvl2) from the screen centre lvl 2 pluscode.

    pluscodesArray = await pluscodeGeneratorLevel2(pluscodeLvl2, 10);
  }

  //*_____________________________________________________________________

  if (pluscodesArray[0].length > 4) {
    // Level 3

    var f = await getAllLvl3UnderLvl2(pluscodeLvl2);

    var t = pluscodesArray.filter((x) => x.substring(0, 4) != pluscodeLvl2);

    if (t.length != 0) {
      for (var x = 0; x < t.length; ) {
        var h = await getAllLvl3UnderLvl2(t[x].substring(0, 4));

        if (h.length > 0) {
          f = f.concat(h);
        }

        //remove
        var g = t.filter((z) => z.substring(0, 4) != t[x].substring(0, 4));
        t = g;
      }
    }

    if (f.length > 0) {
      var lineMarkers = [];

      for (let x = 0; x < f.length; x++) {
        //TODO implement under lvl 3 (lines only)
        //TODO think of ways to improve performance
        //TODO Clean up code/ make more readable

        //TODO If zoom level >12.8698 use lineByCompletePluscode in seperate file in resources/graphql to get lines

        if (zoomLevel < 10.5 && zoomLevel > 10) {
          // Here we merge markers when they get too close
          var u = await pluscodeGeneratorLevel3(f[x].completePluscode, 1);
          console.log("zoomlvl <10.5");
          ////console.log("BBB " + u.length);
          const aindex = u.findIndex((i) => i === f[x].completePluscode);

          if (aindex > -1) {
            u.splice(aindex, 1);
          }

          for (let c = 0; c < u.length; c++) {
            const index = f.findIndex((j) => j.completePluscode === u[c]);

            if (index > -1) {
              f[x].numberOfLines = f[x].numberOfLines + f[index].numberOfLines;

              f.splice(index, 1);
            }
          }
        }
        if (zoomLevel < 10 && zoomLevel > 9) {
          // Here we merge markers when they get too close
          var u = await pluscodeGeneratorLevel3(f[x].completePluscode, 2);
          console.log("zoomlvl <10 ");
          ////console.log("BBB " + u.length);
          const aindex = u.findIndex((i) => i === f[x].completePluscode);

          if (aindex > -1) {
            u.splice(aindex, 1);
          }

          for (let c = 0; c < u.length; c++) {
            const index = f.findIndex((j) => j.completePluscode === u[c]);

            if (index > -1) {
              ////console.log("333 " + f[x].numberOfLines);
              //// console.log("444 " + f[index].numberOfLines);
              f[x].numberOfLines = f[x].numberOfLines + f[index].numberOfLines;

              //// console.log("EEE " + f[index].numberOfLines);
              //// console.log("FFF " + f.length);

              f.splice(index, 1);
            }
          }
        }
        if (zoomLevel < 9 && zoomLevel > 8) {
          // Here we merge markers when they get too close
          var u = await pluscodeGeneratorLevel3(f[x].completePluscode, 3);
          console.log("zoomlvl <9 ");
          //// console.log("BBB " + u.length);
          const aindex = u.findIndex((i) => i === f[x].completePluscode);

          if (aindex > -1) {
            u.splice(aindex, 1);
          }

          for (let c = 0; c < u.length; c++) {
            const index = f.findIndex((j) => j.completePluscode === u[c]);

            if (index > -1) {
              //// console.log("333 " + f[x].numberOfLines);
              //// console.log("444 " + f[index].numberOfLines);
              f[x].numberOfLines = f[x].numberOfLines + f[index].numberOfLines;

              //// console.log("EEE " + f[index].numberOfLines);
              //// console.log("FFF " + f.length);

              f.splice(index, 1);
            }
          }
        }
        if (zoomLevel < 8) {
          // Here we merge markers when they get too close
          var u = await pluscodeGeneratorLevel3(f[x].completePluscode, 5);
          console.log("zoomlvl <8 ");
          //// console.log("BBB " + u.length);
          const aindex = u.findIndex((i) => i === f[x].completePluscode);

          if (aindex > -1) {
            u.splice(aindex, 1);
          }

          for (let c = 0; c < u.length; c++) {
            const index = f.findIndex((j) => j.completePluscode === u[c]);

            if (index > -1) {
              //// console.log("333 " + f[x].numberOfLines);
              //// console.log("444 " + f[index].numberOfLines);
              f[x].numberOfLines = f[x].numberOfLines + f[index].numberOfLines;

              //// console.log("EEE " + f[index].numberOfLines);
              //// console.log("FFF " + f.length);

              f.splice(index, 1);
            }
          }
        }

        //TODO if zoom level > 12.8698 rewrite whats underneath for just line data
        if (zoomLevel < 12.8698) {
          var image = await getNumberMarkerImage(f[x].numberOfLines);

          var coordinates = {
            latitude: parseFloat(f[x].middleCoord.lat),
            longitude: parseFloat(f[x].middleCoord.lng),
          };

          lineMarkers.push(
            <Marker key={f[x].id} coordinate={coordinates}>
              <Image
                source={image}
                style={{
                  width: 40,
                  height: 40,
                }}
                resizeMode="contain"
              />
            </Marker>
          );
        } else {
          for (let k = 0; k < f[x].listOfLines.items.length; k++) {
            var image = await getNumberMarkerImage(1);

            var coordinates = {
              latitude: parseFloat(
                f[x].listOfLines.items[k].startingCoordinates.lat
              ),
              longitude: parseFloat(
                f[x].listOfLines.items[k].startingCoordinates.lng
              ),
            };

            lineMarkers.push(
              <Marker
                key={f[x].listOfLines.items[k].startingCoordinates.id}
                coordinate={coordinates}
              >
                <Image
                  source={image}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  resizeMode="contain"
                />
              </Marker>
            );
          }
        }
      }

      store.dispatch(sendLineMarkers(lineMarkers));
    }
  }

  //*_____________________________________________________________________

  if (pluscodesArray[0].length > 2 && pluscodesArray[0].length < 5) {
    // Level 2
    var f = await getAllLvl2UnderLvl1(pluscodeLvl1);

    var t = pluscodesArray.filter((x) => x.substring(0, 2) != pluscodeLvl1);

    if (t.length != 0) {
      for (var x = 0; x < t.length; ) {
        var h = await getAllLvl2UnderLvl1(t[x].substring(0, 2));

        if (h.length > 0) {
          f = f.concat(h);
        }

        //remove
        var g = t.filter((z) => z.substring(0, 2) != t[x].substring(0, 2));
        t = g;
      }
    }

    if (f.length > 0) {
      var lineMarkers = [];

      for (let x = 0; x < f.length; x++) {
        if (zoomLevel < 7 && zoomLevel > 5) {
          // Here we merge markers when they get too close
          var u = await pluscodeGeneratorLevel2(f[x].completePluscode, 1);
          console.log("zoomlvl <7");
          ////console.log("BBB " + u.length);
          const aindex = u.findIndex((i) => i === f[x].completePluscode);

          if (aindex > -1) {
            u.splice(aindex, 1);
          }

          for (let c = 0; c < u.length; c++) {
            const index = f.findIndex((j) => j.completePluscode === u[c]);

            if (index > -1) {
              ////console.log("333 " + f[x].numberOfLines);
              ////console.log("444 " + f[index].numberOfLines);
              f[x].numberOfLines = f[x].numberOfLines + f[index].numberOfLines;

              //// console.log("EEE " + f[index].numberOfLines);
              //// console.log("FFF " + f.length);

              f.splice(index, 1);
            }
          }
        }

        if (zoomLevel < 5) {
          // Here we merge markers when they get too close
          var u = await pluscodeGeneratorLevel2(f[x].completePluscode, 3);

          ////console.log("BBB " + u.length);
          const aindex = u.findIndex((i) => i === f[x].completePluscode);

          if (aindex > -1) {
            u.splice(aindex, 1);
          }

          for (let c = 0; c < u.length; c++) {
            const index = f.findIndex((j) => j.completePluscode === u[c]);

            if (index > -1) {
              ////console.log("333 " + f[x].numberOfLines);
              ////console.log("444 " + f[index].numberOfLines);
              f[x].numberOfLines = f[x].numberOfLines + f[index].numberOfLines;

              //// console.log("EEE " + f[index].numberOfLines);
              //// console.log("FFF " + f.length);

              f.splice(index, 1);
            }
          }
        }

        var image = await getNumberMarkerImage(f[x].numberOfLines);

        var coordinates = {
          latitude: parseFloat(f[x].middleCoord.lat),
          longitude: parseFloat(f[x].middleCoord.lng),
        };

        lineMarkers.push(
          <Marker key={f[x].id} coordinate={coordinates}>
            <Image
              source={image}
              style={{
                width: 40,
                height: 40,
              }}
              resizeMode="contain"
            />
          </Marker>
        );
      }

      store.dispatch(sendLineMarkers(lineMarkers));
    }
  }
}
