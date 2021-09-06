import { API, graphqlOperation } from "aws-amplify";
import { createPlusCodeLevel3 } from "../../../mutations";

export async function savePluscodeLevel3(
  digits,
  plusCodeLevel3MiddleCoordId,
  numberOfLines,
  parentID,
  completePluscode
) {
  try {
    const response = await API.graphql(
      graphqlOperation(createPlusCodeLevel3, {
        input: {
          digits: digits,
          completePluscode: completePluscode,
          parentIdWithDigits: parentID + digits,
          plusCodeLevel3MiddleCoordId: plusCodeLevel3MiddleCoordId,
          plusCodeLevel3PluscodeParentId: parentID,
          numberOfLines: numberOfLines,
        },
      })
    );

    const {data:{createPlusCodeLevel3:{id}}}
    return id;
  } catch (err) {
    console.log("ERROR: Error creating pluscodelevel3:", err);
    return "No ID";
  }
}
