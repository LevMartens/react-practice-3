import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./presentation/state-management/store/store";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Home from "./presentation/screens/home";
import { NavigationContainer } from "@react-navigation/native";
import { RootStack, BottomTab } from "./presentation/routes/stack";
import * as Location from "expo-location";
import { ActivityIndicator, Colors } from "react-native-paper";

import { Provider as PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import * as Application from "expo-application";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import {
  createCoordinates,
  createLines,
  createPlusCodeLevel1,
  createPlusCodeLevel2,
  createPlusCodeLevel3,
  updatePlusCodeLevel1,
  updatePlusCodeLevel2,
  updatePlusCodeLevel3,
} from "./src/mutations";
import {
  pluscodeByDigits,
  pluscode2ByDigitsAndParent,
  pluscode3ByDigitsAndParent,
} from "./src/queries";
import { getPluscode } from "./domain/use_cases/api/get-pluscode";
Amplify.configure(awsconfig);

export default function App() {
  let [fontsLoaded] = useFonts({
    Evolventa: require("./assets/fonts/Evolventa-Regular.otf"),
  });
  useEffect(() => {
    createCompleteLine();
    //"4QFFFFFF", startingPoint, endPoint
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ justifyContent: "center" }}>
        <ActivityIndicator animating={true} color={"#c84b31"} size={"large"} />
      </View>
    );
  } else {
    return (
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <BottomTab></BottomTab>
            {/* <RootStack> </RootStack> */}
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}

async function createPLuscode1() {}

async function createCompleteLine() {
  var completePluscode = "4QJ77X"; //! TEST DATA: real variable will be passed into function
  var pluscodeLevel1Digits = "4Q"; //! TEST DATA: real variable will be passed into function
  var pluscodeLevel2Digits = "J7"; //! TEST DATA: real variable will be passed into function
  var pluscodeLevel3Digits = "7X"; //! TEST DATA: real variable will be passed into function
  var startingPoint = { lat: "-40", lng: "40" }; //! TEST DATA: real variable will be passed into function
  var endPoint = { lat: "-30", lng: "30" }; //! TEST DATA: real variable will be passed into function

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

async function increaseNumberOfLinesInPluscodeLvl3By(
  count,
  id,
  currentNumberOfLines
) {
  try {
    const response = await API.graphql(
      graphqlOperation(updatePlusCodeLevel3, {
        input: {
          id: id,
          numberOfLines: currentNumberOfLines + count,
        },
      })
    );

    console.log("GraphQL numberOfLines in pluscode lvl 3 successfully updated");
  } catch (err) {
    console.log("Error updating numberOfLines in pluscode lvl 3 ");
  }
}

async function increaseNumberOfLinesInPluscodeLvl2By(
  count,
  id,
  currentNumberOfLines
) {
  try {
    const response = await API.graphql(
      graphqlOperation(updatePlusCodeLevel2, {
        input: {
          id: id,
          numberOfLines: currentNumberOfLines + count,
        },
      })
    );

    console.log("GraphQL numberOfLines in pluscode lvl 2 successfully updated");
  } catch (err) {
    console.log("Error updating numberOfLines in pluscode lvl 2 ");
  }
}

async function checkIfLevel3ExistsUnderlvl2(pluscodeLvl2ID, digits) {
  try {
    const response = await API.graphql(
      graphqlOperation(pluscode3ByDigitsAndParent, {
        parentIdWithDigits: pluscodeLvl2ID + digits,
      })
    );

    console.log(
      "This pluscode level 3 exists! id: " +
        JSON.stringify(response.data.pluscode3ByDigitsAndParent.items[0].id)
    );
    return response.data.pluscode3ByDigitsAndParent.items[0];
  } catch (err) {
    console.log(
      "Warning this pluscode level 3 does not exist under this pluscode lvl 2, returning False "
    );
    return { exists: false };
  }
}

async function increaseNumberOfLinesInPluscodeLvl1By(
  count,
  id,
  currentNumberOfLines
) {
  try {
    const response = await API.graphql(
      graphqlOperation(updatePlusCodeLevel1, {
        input: {
          id: id,
          numberOfLines: currentNumberOfLines + count,
        },
      })
    );

    console.log("GraphQL numberOfLines in pluscode lvl 1 successfully updated");
  } catch (err) {
    console.log("Error updating numberOfLines in pluscode lvl 1 ");
  }
}

async function checkIfLevel2ExistsUnderlvl1(pluscodeLvl1ID, digits) {
  try {
    const response = await API.graphql(
      graphqlOperation(pluscode2ByDigitsAndParent, {
        parentIdWithDigits: pluscodeLvl1ID + digits,
      })
    );

    console.log(
      "This pluscode level 2 exists! id: " +
        JSON.stringify(response.data.pluscode2ByDigitsAndParent.items[0].id)
    );
    return response.data.pluscode2ByDigitsAndParent.items[0];
  } catch (err) {
    console.log(
      "Warning this pluscode level 2 does not exist under this pluscode lvl 1, returning False "
    );
    return { exists: false };
  }
}

async function checkIfLevel1Exists(digits) {
  try {
    const response = await API.graphql(
      graphqlOperation(pluscodeByDigits, {
        digits: digits,
      })
    );

    console.log(
      "This pluscode level1 exists! id: " +
        JSON.stringify(response.data.pluscodeByDigits.items[0].id)
    );
    return response.data.pluscodeByDigits.items[0];
  } catch (err) {
    console.log(
      "Warning this pluscode level 1 does not exist, returning False "
    );
    return { exists: false };
  }
}

async function createGraphQLLine(
  startingPointID,
  endPointID,
  parentID,
  completePluscode
) {
  try {
    const response = await API.graphql(
      graphqlOperation(createLines, {
        input: {
          parentId: parentID,
          linesPluscodeParentId: parentID,
          complete3LevelPluscode: completePluscode,
          linesStartingCoordinatesId: startingPointID,
          linesFinishCoordinatesId: endPointID,
        },
      })
    );

    console.log(
      "GraphQL Line successfully made, id:" +
        JSON.stringify(response.data.createLines.id)
    );
    return response.data.createLines.id;
  } catch (err) {
    console.log("Error creating Line:", err);
    return "No ID";
  }
}

async function createGraphQLPluscodeLevel3(
  digits,
  plusCodeLevel3MiddleCoordId,
  numberOfLines,
  parentID
) {
  try {
    const response = await API.graphql(
      graphqlOperation(createPlusCodeLevel3, {
        input: {
          digits: digits,
          parentIdWithDigits: parentID + digits,
          plusCodeLevel3MiddleCoordId: plusCodeLevel3MiddleCoordId,
          plusCodeLevel3PluscodeParentId: parentID,
          numberOfLines: numberOfLines,
        },
      })
    );

    console.log(
      "GraphQL pluscodeLevel3 successfully made, id:" +
        JSON.stringify(response.data.createPlusCodeLevel3.id)
    );
    return response.data.createPlusCodeLevel3.id;
  } catch (err) {
    console.log("Error creating pluscodelevel3:", err);
    return "No ID";
  }
}

async function createGraphQLPluscodeLevel2(
  digits,
  plusCodeLevel2MiddleCoordId,
  numberOfLines,
  parentID
) {
  try {
    const response = await API.graphql(
      graphqlOperation(createPlusCodeLevel2, {
        input: {
          digits: digits,
          parentIdWithDigits: parentID + digits,
          plusCodeLevel2MiddleCoordId: plusCodeLevel2MiddleCoordId,
          plusCodeLevel2PluscodeParentId: parentID,
          numberOfLines: numberOfLines,
        },
      })
    );

    console.log(
      "GraphQL pluscodeLevel2 successfully made, id:" +
        JSON.stringify(response.data.createPlusCodeLevel2.id)
    );
    return response.data.createPlusCodeLevel2.id;
  } catch (err) {
    console.log("Error creating pluscodelevel2:", err);
    return "No ID";
  }
}

async function createGraphQLPluscodeLevel1(
  digits,
  plusCodeLevel1MiddleCoordId,
  numberOfLines
) {
  try {
    const response = await API.graphql(
      graphqlOperation(createPlusCodeLevel1, {
        input: {
          digits: digits,
          plusCodeLevel1MiddleCoordId: plusCodeLevel1MiddleCoordId,
          numberOfLines: numberOfLines,
        },
      })
    );

    console.log(
      "GraphQL pluscodeLevel1 successfully made, id:" +
        JSON.stringify(response.data.createPlusCodeLevel1.id)
    );
    return response.data.createPlusCodeLevel1.id;
  } catch (err) {
    console.log("Error creating pluscodelevel1:", err);
    return "No ID";
  }
}

async function createGraphQLCoordinateType(lat, lng) {
  try {
    const response = await API.graphql(
      graphqlOperation(createCoordinates, {
        input: { lat: lat, lng: lng },
      })
    );

    console.log(
      "GraphQL Coordinate type successfully made   " +
        JSON.stringify(response.data.createCoordinates.id)
    );

    return response.data.createCoordinates.id;
  } catch (err) {
    console.log("Error creating GraphQL Coordinate type:", err);
    return "No ID";
  }
}
