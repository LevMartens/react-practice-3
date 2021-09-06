import { createLineDraft } from "../create-line-draft";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { deleteLineDrafts } from "../../../mutations";
import awsconfig from "../../../aws-exports";
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from "../../resources/environment/dimensions";

Amplify.configure(awsconfig);

jest.useFakeTimers();

test("line draft not created correctly", async () => {
  const Melbourne = {
    latitude: -37.840935,
    longitude: 144.946457,
  };

  const Carlton = {
    latitude: -37.794932,
    longitude: 144.973475,
  };

  const lineDraft = await createLineDraft(Melbourne, Carlton, "Test Title");

  const {
    id,
    isLoaded,
    rawLineData,
    imageSelected,
    image,
    markerCoordinates,
    markerRegion,
    markerRegionZoomedIn,
  } = lineDraft;

  const {
    parentId,
    complete3LevelPluscode,
    startingCoordinates,
    finishCoordinates,
    midLineCoordinates,
    creatorName,
    description,
    title,
    hashtags,
    dificultyLevel,
    verified,
    lineCompleted,
    elevationPoints,
    latitudeDeltaFit,
    longitudeDeltaFit,
    distance,
  } = rawLineData;

  const { lat: startingLatitude, lng: startingLongitude } = startingCoordinates;
  const { lat: finishLatitude, lng: finishLongitude } = finishCoordinates;
  const { latitude: markerRegionLatitude, longitude: markerRegionLongitude } =
    markerRegion;
  const { lat: midLineLatitude, lng: midLineLongitude } = midLineCoordinates;

  expect(id).toEqual(expect.anything());
  expect(isLoaded).toBeTruthy();
  expect(parentId).toEqual(expect.anything());
  expect(complete3LevelPluscode).toEqual(expect.anything());
  expect(startingCoordinates).toEqual(expect.anything());
  expect(startingLatitude).toBe(-37.840935);
  expect(startingLongitude).toBe(144.946457);
  expect(finishLatitude).toBe(-37.794932);
  expect(finishLongitude).toBe(144.973475);
  expect(midLineCoordinates).toEqual(expect.anything());
  expect(creatorName).toEqual(expect.anything());
  expect(description).toEqual(expect.anything());
  expect(title).toEqual("Test Title");
  expect(Array.isArray(hashtags)).toBeTruthy();
  expect(dificultyLevel).toEqual(expect.anything());
  expect(verified).toEqual(expect.anything());
  expect(lineCompleted).toBeFalsy();
  expect(Array.isArray(elevationPoints)).toBeTruthy();
  expect(latitudeDeltaFit).toEqual(expect.anything());
  expect(longitudeDeltaFit).toEqual(expect.anything());
  expect(distance).toEqual(expect.anything());
  expect(imageSelected).toEqual(expect.anything());
  expect(image).toEqual(expect.anything());
  expect(markerCoordinates).toEqual({
    latitude: startingLatitude,
    longitude: startingLongitude,
  });
  expect(markerRegion).toEqual({
    latitude: markerRegionLatitude,
    longitude: markerRegionLongitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  expect(markerRegionZoomedIn).toEqual({
    latitude: midLineLatitude,
    longitude: midLineLongitude,
    latitudeDelta: latitudeDeltaFit,
    longitudeDelta: longitudeDeltaFit,
  });

  API.graphql(
    graphqlOperation(deleteLineDrafts, {
      input: { id: id },
    })
  );
});
