export async function getDistanceBetween(pointA, pointB) {
  const { latitude: pointALat, longitude: pointALng } = pointA;
  const { latitude: pointBLat, longitude: pointBLng } = pointB;

  const R = 6378.137; // Radius of earth in KM
  const dLat = (pointBLat * Math.PI) / 180 - (pointALat * Math.PI) / 180;
  const dLng = (pointBLng * Math.PI) / 180 - (pointALng * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((pointALat * Math.PI) / 180) *
      Math.cos((pointBLat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const c = R * b;
  const d = c * 1000;
  const e = Math.round(d);
  return e;
}
