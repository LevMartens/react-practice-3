import { API, graphqlOperation } from "aws-amplify";
import { updatePlusCodeLevel1 } from "../../../mutations";

export async function increaseNumberOfLinesInPluscodeLvl1By(
  count,
  id,
  currentNumberOfLines
) {
  try {
    await API.graphql(
      graphqlOperation(updatePlusCodeLevel1, {
        input: {
          id: id,
          numberOfLines: currentNumberOfLines + count,
        },
      })
    );
  } catch (err) {
    console.log(
      "ERROR: error updating numberOfLines in pluscode lvl 1: " + err
    );
  }
}
