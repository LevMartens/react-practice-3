import { API, graphqlOperation } from "aws-amplify";
import { pluscode2ByDigitsAndParent } from "../../../queries";

export async function checkIfLevel2ExistsUnderlvl1(pluscodeLvl1ID, digits) {
  try {
    const response = await API.graphql(
      graphqlOperation(pluscode2ByDigitsAndParent, {
        parentIdWithDigits: pluscodeLvl1ID + digits,
      })
    );
    const {
      data: {
        pluscode2ByDigitsAndParent: {
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
      "WARNING: this pluscode level 2 does not exist under this pluscode lvl 1 "
    );
    return { doesNotExist: true, exists: false };
  }
}
