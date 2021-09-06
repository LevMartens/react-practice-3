import { API, graphqlOperation } from "aws-amplify";
import { updatePlusCodeLevel3 } from "../../../mutations";

export async function increaseNumberOfLinesInPluscodeLvl3By(
  count,
  id,
  currentNumberOfLines
) {
  try {
    await API.graphql(
      graphqlOperation(updatePlusCodeLevel3, {
        input: {
          id: id,
          numberOfLines: currentNumberOfLines + count,
        },
      })
    );
  } catch (err) {
    console.log(
      "ERROR: Error updating numberOfLines in pluscode lvl 3: " + err
    );
  }
}
