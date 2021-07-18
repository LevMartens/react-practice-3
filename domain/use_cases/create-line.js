import { checkIfLevel1Exists } from "../use_cases/graphql/check-if-lvl-1-exists";
import { checkIfLevel2ExistsUnderlvl1 } from "../use_cases/graphql/check-if-lvl-2-exists-under-lvl-1";
import { checkIfLevel3ExistsUnderlvl2 } from "../use_cases/graphql/check-if-lvl-3-exists-under-lvl-2";
import { createGraphQLCoordinateType } from "./graphql/create-graphql-coordinates-type";
import { createGraphQLPluscodeLevel1 } from "./graphql/create-graphql-pluscode-lvl-1";
import { createGraphQLPluscodeLevel2 } from "./graphql/create-graphql-pluscode-lvl-2";
import { createGraphQLPluscodeLevel3 } from "./graphql/create-graphql-pluscode-lvl-3";
import { createGraphQLLine } from "./graphql/create-graphql-line";
import { increaseNumberOfLinesInPluscodeLvl1By } from "./graphql/increase-number-of-lines-in-pluscode-lvl-1-by";
import { increaseNumberOfLinesInPluscodeLvl2By } from "./graphql/increase-number-of-lines-in-pluscode-lvl-2-by";
import { increaseNumberOfLinesInPluscodeLvl3By } from "./graphql/increase-number-of-lines-in-pluscode-lvl-3-by";
import { getPluscode } from "./api/get-pluscode";

export async function createLine(completePluscode, startingPoint, endPoint) {
  const pluscodeLevel1Digits = completePluscode.substring(0, 2);
  const pluscodeLevel2Digits = completePluscode.substring(2, 4);
  const pluscodeLevel3Digits = completePluscode.substring(4, 6);

  console.log(
    "string split " +
      pluscodeLevel1Digits +
      " " +
      pluscodeLevel1Digits +
      " " +
      pluscodeLevel1Digits +
      "-"
  );

  // Check if level 1 pluscode exists
  const pluscodeLevel1Exists = await checkIfLevel1Exists(pluscodeLevel1Digits); //returns object with id if true

  if (pluscodeLevel1Exists.id == null) {
    // Pluscode doesn't exist yet, we create everything new:

    // Creating pluscode level 1
    const middleCoordinatesL1 = await getPluscode(
      `${pluscodeLevel1Digits}FFFFFF%2BFF`
    ); // The location where the numberOfLinesMarker will be placed on the map
    const middleCoordinatesTypeL1ID = await createGraphQLCoordinateType(
      middleCoordinatesL1.lat,
      middleCoordinatesL1.lng
    );
    const pluscodeLevel1ID = await createGraphQLPluscodeLevel1(
      pluscodeLevel1Digits,
      middleCoordinatesTypeL1ID,
      1
    ); // Creating a new pluscode level 1 with 1 line in it

    // Creating pluscode level 2
    const middleCoordinatesL2 = await getPluscode(
      `${pluscodeLevel1Digits}${pluscodeLevel2Digits}FFFF%2BFF`
    );
    const middleCoordinatesTypeL2ID = await createGraphQLCoordinateType(
      middleCoordinatesL2.lat,
      middleCoordinatesL2.lng
    );
    const pluscodeLevel2ID = await createGraphQLPluscodeLevel2(
      pluscodeLevel2Digits,
      middleCoordinatesTypeL2ID,
      1,
      pluscodeLevel1ID
    );

    // Creating pluscode level 3
    const middleCoordinatesL3 = await getPluscode(
      `${pluscodeLevel1Digits}${pluscodeLevel2Digits}${pluscodeLevel3Digits}FF%2BFF`
    );
    const middleCoordinatesTypeL3ID = await createGraphQLCoordinateType(
      middleCoordinatesL3.lat,
      middleCoordinatesL3.lng
    );
    const pluscodeLevel3ID = await createGraphQLPluscodeLevel3(
      pluscodeLevel3Digits,
      middleCoordinatesTypeL3ID,
      1,
      pluscodeLevel2ID
    );

    // Creating new line
    const startingPointCoordinatesTypeID = await createGraphQLCoordinateType(
      startingPoint.lat,
      startingPoint.lng
    );
    const endPointCoordinatesTypeID = await createGraphQLCoordinateType(
      endPoint.lat,
      endPoint.lng
    );
    const lineID = await createGraphQLLine(
      startingPointCoordinatesTypeID,
      endPointCoordinatesTypeID,
      pluscodeLevel3ID,
      completePluscode
    );
  } else {
    // Check if pluscode lvl 2 exists under pluscode lvl 1
    const pluscodeLevel2ExistsUnderLvl1 = await checkIfLevel2ExistsUnderlvl1(
      pluscodeLevel1Exists.id,
      pluscodeLevel2Digits
    ); //returns id if true

    if (pluscodeLevel2ExistsUnderLvl1.id == null) {
      // Pluscode does not exists under lvl 1, we create a new branch under this pluscode lvl 1

      // Update pluscode lvl 1 numberOfLines
      increaseNumberOfLinesInPluscodeLvl1By(
        1,
        pluscodeLevel1Exists.id,
        pluscodeLevel1Exists.numberOfLines
      );

      // Creating pluscode level 2
      const xMiddleCoordinatesL2 = await getPluscode(
        `${pluscodeLevel1Digits}${pluscodeLevel2Digits}FFFF%2BFF`
      );
      const xMiddleCoordinatesTypeL2ID = await createGraphQLCoordinateType(
        xMiddleCoordinatesL2.lat,
        xMiddleCoordinatesL2.lng
      );
      const xPluscodeLevel2ID = await createGraphQLPluscodeLevel2(
        pluscodeLevel2Digits,
        xMiddleCoordinatesTypeL2ID,
        1,
        pluscodeLevel1Exists.id
      );

      // Creating pluscode level 3
      const xMiddleCoordinatesL3 = await getPluscode(
        `${pluscodeLevel1Digits}${pluscodeLevel2Digits}${pluscodeLevel3Digits}FF%2BFF`
      );
      const xMiddleCoordinatesTypeL3ID = await createGraphQLCoordinateType(
        xMiddleCoordinatesL3.lat,
        xMiddleCoordinatesL3.lng
      );
      const xPluscodeLevel3ID = await createGraphQLPluscodeLevel3(
        pluscodeLevel3Digits,
        xMiddleCoordinatesTypeL3ID,
        1,
        xPluscodeLevel2ID
      );

      // Creating new line
      const xStartingPointCoordinatesTypeID = await createGraphQLCoordinateType(
        startingPoint.lat,
        startingPoint.lng
      );
      const xEndPointCoordinatesTypeID = await createGraphQLCoordinateType(
        endPoint.lat,
        endPoint.lng
      );
      const xLineID = await createGraphQLLine(
        xStartingPointCoordinatesTypeID,
        xEndPointCoordinatesTypeID,
        xPluscodeLevel3ID,
        completePluscode
      );
    } else {
      // Check if pluscode lvl 3 exists under pluscode lvl 2
      const pluscodeLevel3ExistsUnderLvl2 = await checkIfLevel3ExistsUnderlvl2(
        pluscodeLevel2ExistsUnderLvl1.id,
        pluscodeLevel3Digits
      );

      if (pluscodeLevel3ExistsUnderLvl2.id == null) {
        // Pluscode does not exists under lvl 2, we create a new branch under this pluscode lvl 2

        // Update pluscode lvl 1 numberOfLines
        increaseNumberOfLinesInPluscodeLvl1By(
          1,
          pluscodeLevel1Exists.id,
          pluscodeLevel1Exists.numberOfLines
        );

        // Update pluscode lvl 2 numberOfLines
        increaseNumberOfLinesInPluscodeLvl2By(
          1,
          pluscodeLevel2ExistsUnderLvl1.id,
          pluscodeLevel2ExistsUnderLvl1.numberOfLines
        );

        // Creating pluscode level 3
        const xxMiddleCoordinatesL3 = await getPluscode(
          `${pluscodeLevel1Digits}${pluscodeLevel2Digits}${pluscodeLevel3Digits}FF%2BFF`
        );
        const xxMiddleCoordinatesTypeL3ID = await createGraphQLCoordinateType(
          xxMiddleCoordinatesL3.lat,
          xxMiddleCoordinatesL3.lng
        );
        const xxPluscodeLevel3ID = await createGraphQLPluscodeLevel3(
          pluscodeLevel3Digits,
          xxMiddleCoordinatesTypeL3ID,
          1,
          pluscodeLevel2ExistsUnderLvl1.id
        );

        // Creating new line
        const xxStartingPointCoordinatesTypeID =
          await createGraphQLCoordinateType(
            startingPoint.lat,
            startingPoint.lng
          );
        const xxEndPointCoordinatesTypeID = await createGraphQLCoordinateType(
          endPoint.lat,
          endPoint.lng
        );
        const xxLineID = await createGraphQLLine(
          xxStartingPointCoordinatesTypeID,
          xxEndPointCoordinatesTypeID,
          xxPluscodeLevel3ID,
          completePluscode
        );
      } else {
        // Update pluscode lvl 1 numberOfLines
        increaseNumberOfLinesInPluscodeLvl1By(
          1,
          pluscodeLevel1Exists.id,
          pluscodeLevel1Exists.numberOfLines
        );

        // Update pluscode lvl 2 numberOfLines
        increaseNumberOfLinesInPluscodeLvl2By(
          1,
          pluscodeLevel2ExistsUnderLvl1.id,
          pluscodeLevel2ExistsUnderLvl1.numberOfLines
        );

        // Update pluscode lvl 3 numberOfLines
        increaseNumberOfLinesInPluscodeLvl3By(
          1,
          pluscodeLevel3ExistsUnderLvl2.id,
          pluscodeLevel3ExistsUnderLvl2.numberOfLines
        );

        // Creating new line
        const xxxStartingPointCoordinatesTypeID =
          await createGraphQLCoordinateType(
            startingPoint.lat,
            startingPoint.lng
          );
        const xxxEndPointCoordinatesTypeID = await createGraphQLCoordinateType(
          endPoint.lat,
          endPoint.lng
        );
        const xxxLineID = await createGraphQLLine(
          xxxStartingPointCoordinatesTypeID,
          xxxEndPointCoordinatesTypeID,
          pluscodeLevel3ExistsUnderLvl2.id,
          completePluscode
        );
      }
    }
  }
}
