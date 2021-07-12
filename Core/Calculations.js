import React from "react";

function degreesToRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function radiansToDegrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}

export function getDistanceBetween(pointA, pointB) {
  var lat1 = pointA.latitude;
  var lon1 = pointA.longitude;
  var lat2 = pointB.latitude;
  var lon2 = pointB.longitude;

  var R = 6378.137; // Radius of earth in KM
  var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000; // Meters
}

export function getCoordinatesBetween(pointA, pointB, distanceToUse) {
  // Convert degrees to radians
  var latitudeRadian1 = degreesToRadians(pointA.latitude);
  var longitudeRadian1 = degreesToRadians(pointA.longitude);
  var latitudeRadian2 = degreesToRadians(pointB.latitude);
  var longitudeRadian2 = degreesToRadians(pointB.longitude);

  // Calculate distance in longitude
  var aLongitude = longitudeRadian2 - longitudeRadian1;

  // Calculate common variables
  var latRadSin1 = Math.sin(latitudeRadian1);
  var latRadSin2 = Math.sin(latitudeRadian2);
  var latRadCos1 = Math.cos(latitudeRadian1);
  var latRadCos2 = Math.cos(latitudeRadian2);
  var aLongitudeCos = Math.cos(aLongitude);

  // Find distance from A to B
  var distance = Math.acos(
    latRadSin1 * latRadSin2 + latRadCos1 * latRadCos2 * aLongitudeCos
  );

  // Find bearing from A to B
  var bearing = Math.atan2(
    Math.sin(aLongitude) * latRadCos2,
    latRadCos1 * latRadSin2 - latRadSin1 * latRadCos2 * aLongitudeCos
  );

  // Find new point
  var angularDistance = distance * distanceToUse;
  var angDistSin = Math.sin(angularDistance);
  var angDistCos = Math.cos(angularDistance);
  var xlatRad = Math.asin(
    latRadSin1 * angDistCos + latRadCos1 * angDistSin * Math.cos(bearing)
  );
  var xlonRad =
    longitudeRadian1 +
    Math.atan2(
      Math.sin(bearing) * angDistSin * latRadCos1,
      angDistCos - latRadSin1 * Math.sin(xlatRad)
    );

  // Convert radians to microdegrees

  var xlat = radiansToDegrees(xlatRad);
  var xlon = radiansToDegrees(xlonRad);
  if (xlat > 90) xlat = 90;
  if (xlat < -90) xlat = -90;
  while (xlon > 180) xlon -= 360;
  while (xlon <= -1800) xlon += 360;
  return {
    latitude: xlat,
    longitude: xlon,
  };
}

export function setOneMeterApart(distance) {
  return 1 / distance;
}
