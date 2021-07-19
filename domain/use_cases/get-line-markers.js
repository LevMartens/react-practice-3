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
import { getAllLvl3UnderLvl2 } from "../resources/graphql/get-all-lvl-3-under-lvl-2";

export async function getLineMarkers(regionData) {
  var pluscodesArray = [];

  const pluscode = await getPluscodeFromCoordinates(
    `${regionData.latitude},${regionData.longitude}`
  );

  const pluscodeLvl3 = pluscode.substring(0, 6);
  const pluscodeLvl2 = pluscode.substring(0, 4);

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

  if (zoomLevel < 12.4) {
    // 3 jumps in generator lvl 3

    pluscodesArray = await pluscodeGeneratorLevel3(pluscodeLvl3, 3);
  }

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
