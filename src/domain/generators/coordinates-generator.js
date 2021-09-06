function degreesToRadians(degrees) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}

function radiansToDegrees(radians) {
  const pi = Math.PI;
  return radians * (180 / pi);
}

export async function getCoordinatesBetween(pointA, pointB, atThisPoint) {
  // atThisPoint: 0.5 = middle, 0.25 = quarter of total distance etc...
  const { latitude: pointALat, longitude: pointALng } = pointA;
  const { latitude: pointBLat, longitude: pointBLng } = pointB;
  const thisPoint = atThisPoint;

  // Convert degrees to radians
  const latitudeRadian1 = degreesToRadians(pointALat);
  const longitudeRadian1 = degreesToRadians(pointALng);
  const latitudeRadian2 = degreesToRadians(pointBLat);
  const longitudeRadian2 = degreesToRadians(pointBLng);

  // Calculate distance in longitude
  const aLongitude = longitudeRadian2 - longitudeRadian1;

  // Calculate common variables
  const latRadSin1 = Math.sin(latitudeRadian1);
  const latRadSin2 = Math.sin(latitudeRadian2);
  const latRadCos1 = Math.cos(latitudeRadian1);
  const latRadCos2 = Math.cos(latitudeRadian2);
  const aLongitudeCos = Math.cos(aLongitude);

  // Find distance from A to B
  const distance = Math.acos(
    latRadSin1 * latRadSin2 + latRadCos1 * latRadCos2 * aLongitudeCos
  );

  // Find bearing from A to B
  const bearing = Math.atan2(
    Math.sin(aLongitude) * latRadCos2,
    latRadCos1 * latRadSin2 - latRadSin1 * latRadCos2 * aLongitudeCos
  );

  // Find new point
  const angularDistance = distance * thisPoint;
  const angDistSin = Math.sin(angularDistance);
  const angDistCos = Math.cos(angularDistance);
  const xlatRad = Math.asin(
    latRadSin1 * angDistCos + latRadCos1 * angDistSin * Math.cos(bearing)
  );
  const xlonRad =
    longitudeRadian1 +
    Math.atan2(
      Math.sin(bearing) * angDistSin * latRadCos1,
      angDistCos - latRadSin1 * Math.sin(xlatRad)
    );

  // Convert radians to microdegrees
  let xlat = radiansToDegrees(xlatRad);
  let xlon = radiansToDegrees(xlonRad);
  if (xlat > 90) xlat = 90;
  if (xlat < -90) xlat = -90;
  while (xlon > 180) xlon -= 360;
  while (xlon <= -1800) xlon += 360;

  const newCoordinates = {
    latitude: xlat,
    longitude: xlon,
  };

  return newCoordinates;
}
