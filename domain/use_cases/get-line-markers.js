import { getZoomLevel } from "../generators/zoom-level-generator";
import { pluscodeGeneratorLevel3 } from "../generators/pluscode-generator";
import { getPluscodeFromCoordinates } from "../resources/api/get-pluscode";
import { getMarkerDataLvl3 } from "../resources/graphql/get-marker-data-lvl-3";
import { NumberOfLinesMarker } from "../../presentation/components/lines-nearby";
import { getNumberMarkerImage } from "../helpers/switch_cases";
import store from "../../presentation/state-management/store/store";
import { sendLineMarkers } from "../../presentation/state-management/actions/actions";
import React from "react";
import MapView, { Polyline, Marker, Circle } from "react-native-maps";

import { ActivityIndicator, Colors } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Icon,
} from "react-native";

export async function getLineMarkers(regionData) {
  var pluscodesArray = [];

  const pluscode = await getPluscodeFromCoordinates(
    `${regionData.latitude},${regionData.longitude}`
  );

  const pluscodeLvl3 = pluscode.substring(0, 6);

  const zoomLevel = await getZoomLevel(regionData);
  console.log("Zoom lvl " + zoomLevel);

  if (zoomLevel < 12.8698 && zoomLevel > 12.6769) {
    // 1 jump in generator lvl 3

    pluscodesArray = await pluscodeGeneratorLevel3(pluscodeLvl3, 1);
  }

  if (zoomLevel < 12.6769 && zoomLevel > 12.4) {
    // 2 jumps in generator lvl 3

    pluscodesArray = await pluscodeGeneratorLevel3(pluscodeLvl3, 2);
  }

  if (zoomLevel < 12.4 && zoomLevel > 12.0) {
    // 3 jumps in generator lvl 3

    pluscodesArray = await pluscodeGeneratorLevel3(pluscodeLvl3, 3);
  }

  var markerComponentsArray = [];

  if (pluscodesArray.length > 1) {
    for (let x = 0; x < pluscodesArray.length; x++) {
      // Get numberOfLines from lvl 3
      var markerData = await getMarkerDataLvl3(pluscodesArray[x]);

      if (markerData.numberOfLines > 1) {
        var coordinates = {
          latitude: parseFloat(markerData.middleCoord.lat),
          longitude: parseFloat(markerData.middleCoord.lng),
        };
        var image = await getNumberMarkerImage(markerData.numberOfLines);

        var xPackage = {
          coordinates: coordinates,
          key: markerData.id,
          image: image,
        };
        // var comp = (
        //   <NumberOfLinesMarker
        //     coordinates={coordinates}
        //     id={markerData.id}
        //     image={image}
        //   ></NumberOfLinesMarker>
        // );

        markerComponentsArray.push(xPackage);
        console.log(
          "markerComponentsArray[0].coordinates.latitude: " +
            markerComponentsArray[0].coordinates.latitude
        );
        var sendComponents = markerComponentsArray.map((x) => (
          <Marker key={x.key} coordinate={x.coordinates}>
            <Image
              source={x.image}
              style={{
                width: 40,
                height: 40,
              }}
              resizeMode="contain"
            />
          </Marker>
        ));
      }
    }
  }
  console.log("sendComponets.lengts before sending: " + sendComponents.length);
  store.dispatch(sendLineMarkers(sendComponents));
}
