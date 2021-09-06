import { createGraphQLCoordinateType } from "../resources/backend/create-graphql-coordinates-type";
import { getPluscodeFromCoordinates } from "../resources/api/get-pluscode";
import { getDistanceBetween } from "../generators/distance-generator";
import { mapElevationPoints, packLineData } from "../helpers/packers";
import { showAlert } from "../resources/environment/alerts";
import { saveLineDraft } from "../resources/backend/save-line-draft";
import { selectLineDraft } from "../../presentation/state-management/actions/actions";
import { getLatLongDeltaBasedOn } from "../generators/lat-long-delta-generator";
import { getElevation } from "../resources/api/get-elevation";
import store from "../../presentation/state-management/store/store";
import { getCoordinatesBetween } from "../generators/Calculations";

export async function createLineDraft(pointA, pointB, lineTitle) {
  const startingPoint = pointA;

  const endPoint = pointB;

  const title = lineTitle;

  const { latitude: startLatitude, longitude: startLongitude } = startingPoint;

  const pluscode = await getPluscodeFromCoordinates(
    `${startLatitude},${startLongitude}`
  );

  const completePluscode = pluscode.substring(0, 6);

  const distance = await getDistanceBetween(startingPoint, endPoint);

  const midPoint = await getCoordinatesBetween(startingPoint, endPoint, 0.5);

  const fitLineInFrame = await getLatLongDeltaBasedOn(distance);

  const { latitudeDelta, longitudeDelta } = fitLineInFrame;

  const rawElevationData = await getElevation(startingPoint, endPoint);

  const elevationPoints = await mapElevationPoints(rawElevationData);

  const lineCompleted = false; // Becomes public after completion

  const verified = false; // Can be set/amended by an authorised person

  const dificultyLevel = "N/A"; // Can be set by the user after completion

  const hashtags = []; // Can be set by the user after completion

  const description = "N/A"; // Can be set by the user after completion

  const creatorName = "N/A"; //TODO

  const { latitude: endLatitude, longitude: endLongitude } = endPoint;
  const { latitude: midLatitude, longitude: midLongitude } = midPoint;

  const startingPointCoordinatesTypeID = await createGraphQLCoordinateType(
    startLatitude,
    startLongitude
  );
  const endPointCoordinatesTypeID = await createGraphQLCoordinateType(
    endLatitude,
    endLongitude
  );

  const midPointCoordinatesTypeID = await createGraphQLCoordinateType(
    midLatitude,
    midLongitude
  );
  const input = {
    parentId: "NOPARENTID",
    complete3LevelPluscode: completePluscode,
    lineDraftsStartingCoordinatesId: startingPointCoordinatesTypeID,
    lineDraftsFinishCoordinatesId: endPointCoordinatesTypeID,
    lineDraftsMidLineCoordinatesId: midPointCoordinatesTypeID,
    creatorName: creatorName,
    description: description,
    dificultyLevel: dificultyLevel,
    distance: distance,
    elevationPoints: elevationPoints,
    hashtags: hashtags,
    latitudeDeltaFit: latitudeDelta,
    longitudeDeltaFit: longitudeDelta,
    lineCompleted: lineCompleted,
    title: title,
    verified: verified,
  };

  const line = await saveLineDraft(input);

  if (line.isNOTSaved) {
    showAlert("Line draft didn't save, Lev sucks");
    console.log(
      "ERROR: Line draft didn't save, data back: " +
        JSON.stringify(line.data) +
        " source: create-line.js 184"
    );
    return;
  }

  const lineDraft = await packLineData(line);

  store.dispatch(selectLineDraft(lineDraft));

  return lineDraft; // Return for testing
}
