import { API, graphqlOperation } from "aws-amplify";
import { createPlusCodeLevel2 } from "../../../mutations";

export async function savePluscodeLevel2(
  digits,
  plusCodeLevel2MiddleCoordId,
  numberOfLines,
  parentID,
  completePluscode
) {
  try {
    const response = await API.graphql(
      graphqlOperation(createPlusCodeLevel2, {
        input: {
          digits: digits,
          completePluscode: completePluscode,
          parentIdWithDigits: parentID + digits,
          plusCodeLevel2MiddleCoordId: plusCodeLevel2MiddleCoordId,
          plusCodeLevel2PluscodeParentId: parentID,
          numberOfLines: numberOfLines,
        },
      })
    );

    const {
      data: {
        createPlusCodeLevel2: { id },
      },
    } = response;
    return id;
  } catch (err) {
    console.log("ERROR: Error creating pluscodelevel2:", err);
    return "No ID";
  }
}
