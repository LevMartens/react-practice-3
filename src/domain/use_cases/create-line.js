import { checkIfLevel1Exists } from "../resources/backend/check-if-lvl-1-exists";
import { checkIfLevel2ExistsUnderlvl1 } from "../resources/backend/check-if-lvl-2-exists-under-lvl-1";
import { checkIfLevel3ExistsUnderlvl2 } from "../resources/backend/check-if-lvl-3-exists-under-lvl-2";
import { createGraphQLCoordinateType } from "../resources/backend/create-graphql-coordinates-type";
import { savePluscodeLevel1 } from "../resources/backend/save-pluscode-lvl-1";
import { savePluscodeLevel2 } from "../resources/backend/save-pluscode-lvl-2";
import { savePluscodeLevel3 } from "../resources/backend/save-pluscode-lvl-3";
import { saveLine } from "../resources/backend/save-line";
import { increaseNumberOfLinesInPluscodeLvl1By } from "../resources/backend/increase-number-of-lines-in-pluscode-lvl-1-by";
import { increaseNumberOfLinesInPluscodeLvl2By } from "../resources/backend/increase-number-of-lines-in-pluscode-lvl-2-by";
import { increaseNumberOfLinesInPluscodeLvl3By } from "../resources/backend/increase-number-of-lines-in-pluscode-lvl-3-by";
import { getCoordinesFromPluscode } from "../resources/api/get-pluscode";
import { getDistanceBetween } from "../generators/distance-generator";
import { mapElevationPoints, packLineMarkerData } from "../helpers/packers";
import { showAlert } from "../resources/environment/alerts";

export async function createLine(startingPoint, endPoint) {
  const { latitude, longitude } = startingPoint;

  const pluscode = await getPluscodeFromCoordinates(`${latitude},${longitude}`);

  const completePluscode = pluscode.substring(0, 6);
  const pluscodeLevel1Digits = pluscode.substring(0, 2);
  const pluscodeLevel2Digits = pluscode.substring(2, 4);
  const pluscodeLevel3Digits = pluscode.substring(4, 6);

  const pluscodeLevel1InDB = await checkIfLevel1Exists(pluscodeLevel1Digits);
  let pluscodeLevel1ID = "";

  if (pluscodeLevel1InDB.exists) {
    pluscodeLevel1ID = pluscodeLevel1InDB.id;
    increaseNumberOfLinesInPluscodeLvl1By(
      1,
      pluscodeLevel1InDB.id,
      pluscodeLevel1InDB.numberOfLines
    );
  }

  if (pluscodeLevel1InDB.doesNotExist) {
    const middleCoordinatesL1 = await getCoordinesFromPluscode(
      `${pluscodeLevel1Digits}FFFFFF%2BFF`
    );

    const middleCoordinatesTypeL1ID = await createGraphQLCoordinateType(
      middleCoordinatesL1.lat,
      middleCoordinatesL1.lng
    );

    pluscodeLevel1ID = await savePluscodeLevel1(
      pluscodeLevel1Digits,
      middleCoordinatesTypeL1ID,
      1
    );
  }

  const pluscodeLevel2InDB = pluscodeLevel1InDB.doesNotExist
    ? { doesNotExist: true, exists: false }
    : await checkIfLevel2ExistsUnderlvl1(
        pluscodeLevel1ID,
        pluscodeLevel2Digits
      );

  let pluscodeLevel2ID = "";

  if (pluscodeLevel2InDB.exists) {
    pluscodeLevel2ID = pluscodeLevel2InDB.id;
    increaseNumberOfLinesInPluscodeLvl2By(
      1,
      pluscodeLevel2InDB.id,
      pluscodeLevel2InDB.numberOfLines
    );
  }

  if (pluscodeLevel2InDB.doesNotExist) {
    const middleCoordinatesL2 = await getCoordinesFromPluscode(
      `${pluscodeLevel1Digits}${pluscodeLevel2Digits}FFFF%2BFF`
    );
    const middleCoordinatesTypeL2ID = await createGraphQLCoordinateType(
      middleCoordinatesL2.lat,
      middleCoordinatesL2.lng
    );
    pluscodeLevel2ID = await savePluscodeLevel2(
      pluscodeLevel2Digits,
      middleCoordinatesTypeL2ID,
      1,
      pluscodeLevel1ID,
      completePluscode.substring(0, 4)
    );
  }

  const pluscodeLevel3InDB = pluscodeLevel2InDB.doesNotExist
    ? { doesNotExist: true, exists: false }
    : await checkIfLevel3ExistsUnderlvl2(
        pluscodeLevel2ID,
        pluscodeLevel3Digits
      );

  let pluscodeLevel3ID = "";

  if (pluscodeLevel3InDB.exists) {
    pluscodeLevel3ID = pluscodeLevel3InDB.id;
    increaseNumberOfLinesInPluscodeLvl3By(
      1,
      pluscodeLevel3InDB.id,
      pluscodeLevel3InDB.numberOfLines
    );
  }

  if (pluscodeLevel3InDB.doesNotExist) {
    const middleCoordinatesL3 = await getCoordinesFromPluscode(
      `${pluscodeLevel1Digits}${pluscodeLevel2Digits}${pluscodeLevel3Digits}FF%2BFF`
    );
    const middleCoordinatesTypeL3ID = await createGraphQLCoordinateType(
      middleCoordinatesL3.lat,
      middleCoordinatesL3.lng
    );
    pluscodeLevel3ID = await savePluscodeLevel3(
      pluscodeLevel3Digits,
      middleCoordinatesTypeL3ID,
      1,
      pluscodeLevel2ID,
      completePluscode
    );
  }

  const distance = await getDistanceBetween(startingPoint, endPoint);

  const fitLineInFrame = await getLatLongDeltaBasedOn(distance);

  const { latitudeDeltaFit, longitudeDeltaFit } = fitLineInFrame;

  const rawElevationData = await getElevation(startingPoint, endPoint);

  const elevationPoints = await mapElevationPoints(rawElevationData);

  const lineCompleted = false; // Becomes public after completion

  const verified = false; // Can be set/amended by an authorised person

  const dificultyLevel = "N/A"; // Can be set by the user after completion

  const hashTags = []; // Can be set by the user after completion

  const title = "N/A"; // Can be set by the user after completion

  const description = "N/A"; // Can be set by the user after completion

  const creatorName = "N/A"; //TODO

  const startingPointCoordinatesTypeID = await createGraphQLCoordinateType(
    startingPoint.lat,
    startingPoint.lng
  );
  const endPointCoordinatesTypeID = await createGraphQLCoordinateType(
    endPoint.lat,
    endPoint.lng
  );

  const input = {
    parentId: pluscodeLevel3ID,
    linesPluscodeParentId: pluscodeLevel3ID,
    complete3LevelPluscode: completePluscode,
    linesStartingCoordinatesId: startingPointCoordinatesTypeID,
    linesFinishCoordinatesId: endPointCoordinatesTypeID,
    creatorName: creatorName,
    description: description,
    dificultyLevel: dificultyLevel,
    distance: distance,
    elevationPoints: elevationPoints,
    hashTags: hashTags,
    latitudeDeltaFit: latitudeDeltaFit,
    longitudeDeltaFit: longitudeDeltaFit,
    lineCompleted: lineCompleted,
    title: title,
    verified: verified,
  };

  const line = await saveLine(input);

  if (line.isNOTSaved) {
    showAlert("Lines didn't save, Lev sucks");
    console.log(
      "Line didn't save, data back: " +
        JSON.stringify(line.data) +
        " source: create-line.js 184"
    );
    return;
  }

  const lineMarker = await packLineMarkerData(line);

  store.dispatch(selectMarker(lineMarker));
}
