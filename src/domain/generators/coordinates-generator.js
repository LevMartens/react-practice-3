function degreesToRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function radiansToDegrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}

export async function getCoordinatesBetween(pointA, pointB, atThisPoint) {
  // atThisPoint: 0.5 = middle, 0.25 = quarter of total distance etc...

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
  var angularDistance = distance * atThisPoint;
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
