import { API, graphqlOperation } from "aws-amplify";
import { createPlusCodeLevel1 } from "../../../mutations";

export async function createGraphQLPluscodeLevel1(
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
