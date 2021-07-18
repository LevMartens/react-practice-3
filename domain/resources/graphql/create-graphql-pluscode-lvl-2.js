import { API, graphqlOperation } from "aws-amplify";
import { createPlusCodeLevel2 } from "../../../src/mutations";

export async function createGraphQLPluscodeLevel2(
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
