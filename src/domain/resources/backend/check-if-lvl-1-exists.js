import { API, graphqlOperation } from "aws-amplify";

import { pluscodeByDigits } from "../../../queries";

export async function checkIfLevel1Exists(digits) {
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
    return response.data.pluscodeByDigits.items[0].id == null
      ? { doesNotExist: true, exists: false }
      : {
          doesNotExist: false,
          exists: true,
          id: response.data.pluscodeByDigits.items[0].id,
          numberOfLines: response.data.pluscodeByDigits.items[0].numberOfLines,
        };
  } catch (err) {
    console.log(
      "Warning this pluscode level 1 does not exist, returning False "
    );
    return { doesNotExist: false, exists: true };
  }
}
