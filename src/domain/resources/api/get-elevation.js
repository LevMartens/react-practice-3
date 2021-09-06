import * as SecureStore from "expo-secure-store";
import { apiKey } from "../../../../api-key";

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    console.log(
      "ERROR: No api key found " +
        JSON.stringify(result) +
        ". source: get-elevation.js"
    );
  }
}

export async function getElevation(startingPoint, endPoint) {
  const startLat = startingPoint.latitude;
  const startLong = startingPoint.longitude;
  const endLat = endPoint.latitude;
  const endLong = endPoint.longitude;
  //const apiKey = await getValueFor("google-API-key");

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/elevation/json?path=${startLat},${startLong}|${endLat},${endLong}&samples=10&key=${apiKey}`,
    {}
  );
  const json = await response.json();

  if (json.status !== "OK") {
    console.log(
      "ERROR: Something went wrong fetching elevation with coordinates. source: get-elevation.js"
    );
  }

  return json.results;
}

// async function save(key, value) {
//   await SecureStore.setItemAsync(key, value);
// }
