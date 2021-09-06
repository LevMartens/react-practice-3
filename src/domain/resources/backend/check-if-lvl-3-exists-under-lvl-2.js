import { API, graphqlOperation } from "aws-amplify";
import { pluscode3ByDigitsAndParent } from "../../../queries";

export async function checkIfLevel3ExistsUnderlvl2(pluscodeLvl2ID, digits) {
  try {
    const response = await API.graphql(
      graphqlOperation(pluscode3ByDigitsAndParent, {
        parentIdWithDigits: pluscodeLvl2ID + digits,
      })
    );

    const {
      data: {
        pluscode3ByDigitsAndParent: {
          items: [{ id, numberOfLines }],
        },
      },
    } = response;

    return id == null
      ? { doesNotExist: true, exists: false }
      : {
          doesNotExist: false,
          exists: true,
          id: id,
          numberOfLines: numberOfLines,
        };
  } catch (err) {
    console.log(
      "WARNING: this pluscode level 3 does not exist under this pluscode lvl 2"
    );
    return { doesNotExist: true, exists: false };
  }
}
