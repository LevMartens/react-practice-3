import { API, graphqlOperation } from "aws-amplify";

import { pluscode2ByDigitsAndParent } from "../../../queries";

export async function checkIfLevel2ExistsUnderlvl1(pluscodeLvl1ID, digits) {
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
