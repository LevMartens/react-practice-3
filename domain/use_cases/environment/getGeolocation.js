import React, { useEffect } from "react";
import {
  currentPositionUpdate,
  updatePath,
} from "../../../presentation/state-management/actions/actions";
import * as Location from "expo-location";
import store from "../../../presentation/state-management/store/store";
import {
  getCoordinatesBetween,
  getDistanceBetween,
  setOneMeterApart,
} from "../../generators/Calculations";
import { measure } from "react-native-reanimated";
import { Polyline } from "react-native-maps";

export const getGeolocation = async (pointA, pointB, aMeter) => {
  var pathColorsArray = [];
  var measurePoint = 0;
  var p = [];
  var previousDistanceToEndPoint = getDistanceBetween(pointA, pointB);

  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.log("denied");
  }

  await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 10,
    },
    async (loc) => {
      console.log("BEFORE RESPONSE");

      var response = await loadPathData(
        loc,
        pointA,
        pointB,
        aMeter,
        measurePoint,
        previousDistanceToEndPoint
      );

      var pathArray = [];

      measurePoint = response.measurePoint;
      previousDistanceToEndPoint = response.distanceToEndPoint;

      pathArray = p.slice();

      console.log("pathArray before " + pathArray.length);

      var lastPosition =
        pathArray.length != 0
          ? pathArray[pathArray.length - 1].path[1]
          : pointA;

      // New coordinates pushed onto the path
      pathArray.push({
        path: [lastPosition, response.currentPosition],
        pathColor: response.pathColor,
      });

      p = pathArray.slice();

      console.log("pathArray after" + pathArray.length);

      var path = pathArray.map((object) => {
        return (
          <Polyline
            style={{
              position: "absolute",
            }}
            strokeWidth={3}
            coordinates={object.path}
            strokeColor={object.pathColor}
          />
        );
      });

      console.log("AFTER RESPONSE");

      store.dispatch(currentPositionUpdate(response.currentPosition));
      store.dispatch(
        updatePath(
          pointA,
          pointB,
          aMeter,
          response.currentPosition,
          response.measurePoint,
          path,
          response.isWithin20m
        )
      );
    }
  );
};

async function loadPathData(
  loc,
  pointA,
  pointB,
  aMeter,
  measurePoint,
  previousDistanceToEndPoint
) {
  var pathColor = "FFFFFF";

  // Bool wether cursor/person was out of bounce
  var isWithin20m = false;

  var currentPosition = {
    latitude: loc.coords.latitude,
    longitude: loc.coords.longitude,
  };

  var distanceToEndPoint = getDistanceBetween(currentPosition, pointB);
  var deltaDistanceToEndPoint = previousDistanceToEndPoint - distanceToEndPoint;

  var x = measurePoint + deltaDistanceToEndPoint;

  console.log("Delta " + deltaDistanceToEndPoint);
  console.log("X " + x);

  for (let i = -15 + x; i < 15 + x && isWithin20m == false; i++) {
    var a = getCoordinatesBetween(pointA, pointB, aMeter * i);

    var distanceBetweenXAndCursor = getDistanceBetween(a, currentPosition);

    console.log(
      "OFB var distanceBetweenXAndCursor " + distanceBetweenXAndCursor + "m"
    );

    // Setting pathcolor depending weather the person was further than 20m away from the line.
    if (distanceBetweenXAndCursor > 20) {
      console.log("OFB distanceBetweenXAndCursor > 20, isWithin20m == false");
      isWithin20m = false;
    } else {
      console.log("OFB distanceBetweenXAndCursor < 20 isWithin20m == true");
      pathColor = "#29BB89"; // Green
      isWithin20m = true;
    }
  }

  if (isWithin20m == false) {
    console.log("OFB isWithin20m == false, just before return");
    pathColor = "#BE0000"; // Red
  }

  measurePoint = x;

  return {
    currentPosition: currentPosition,
    measurePoint: measurePoint,
    pathColor: pathColor,
    isWithin20m: isWithin20m,
    distanceToEndPoint: distanceToEndPoint,
  };
}
