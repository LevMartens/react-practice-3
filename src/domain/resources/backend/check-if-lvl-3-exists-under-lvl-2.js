import { API, graphqlOperation } from "aws-amplify";

import { pluscode3ByDigitsAndParent } from "../../../queries";

export async function checkIfLevel3ExistsUnderlvl2(pluscodeLvl2ID, digits) {
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
