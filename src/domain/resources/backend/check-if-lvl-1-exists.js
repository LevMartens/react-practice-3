import { API, graphqlOperation } from "aws-amplify";
import { pluscodeByDigits } from "../../../queries";

export async function checkIfLevel1Exists(digits) {
  try {
    const response = await API.graphql(
      graphqlOperation(pluscodeByDigits, {
        digits: digits,
      })
    );

    const {
      data: {
        pluscodeByDigits: {
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
    console.log("WARNING: this pluscode level 1 does not exist");
    return { doesNotExist: true, exists: false };
  }
}
