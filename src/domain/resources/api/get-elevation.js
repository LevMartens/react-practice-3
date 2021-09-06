import { apiKey } from "../../../../api-key";

export async function getElevation(startingPoint, endPoint) {
  const { latitude: startLat, longitude: startLng } = startingPoint;

  const { latitude: endLat, longitude: endLng } = endPoint;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/elevation/json?path=${startLat},${startLng}|${endLat},${endLng}&samples=10&key=${apiKey}`,
    {}
  );
  const { status, results } = await response.json();

  if (status !== "OK") {
    console.log(
      "ERROR: Something went wrong fetching elevation with coordinates. source: get-elevation.js"
    );
  }

  return results;
}
