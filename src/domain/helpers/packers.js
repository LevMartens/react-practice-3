import image from "../../../assets/lineMarker.png";
import imageSelected from "../../../assets/lineMarkerSelected.png";
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from "../resources/environment/dimensions";

//* Functions in packers.js unpack data (objects) and put them back together in a way the presentation layer can use it

export async function mapElevationPoints(rawData) {
  let elevationPointsArray = [];
  rawData.map((x) => {
    const elevationPoint = x.elevation.toFixed(1);
    elevationPointsArray.push(elevationPoint);
  });
  return elevationPointsArray;
}

export async function packLineData(rawData) {
  const { data } = rawData;
  const {
    startingCoordinates,
    midLineCoordinates,
    latitudeDeltaFit,
    longitudeDeltaFit,
  } = data;
  const { id, lat, lng } = startingCoordinates;

  const markerCoordinates = {
    latitude: parseFloat(lat),
    longitude: parseFloat(lng),
  };
  const { latitude, longitude } = markerCoordinates;

  const markerRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const markerRegionZoomedIn = {
    latitude: parseFloat(midLineCoordinates.lat),
    longitude: parseFloat(midLineCoordinates.lng),
    latitudeDelta: latitudeDeltaFit,
    longitudeDelta: longitudeDeltaFit,
  };

  const lineData = {
    id: id,
    isLoaded: true,
    rawLineData: data,
    imageSelected: imageSelected,
    image: image,
    markerCoordinates: markerCoordinates,
    markerRegion: markerRegion,
    markerRegionZoomedIn: markerRegionZoomedIn,
  };

  return lineData;
}
