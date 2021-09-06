import { API, graphqlOperation } from "aws-amplify";
import { createPlusCodeLevel1 } from "../../../mutations";

export async function savePluscodeLevel1(
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
    const {
      data: {
        createPlusCodeLevel1: { id },
      },
    } = response;
    return id;
  } catch (err) {
    console.log("ERROR: Error creating pluscodelevel1:", err);
    return "No ID";
  }
}
