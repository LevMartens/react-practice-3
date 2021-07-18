import { API, graphqlOperation } from "aws-amplify";
import { updatePlusCodeLevel3 } from "../../../src/mutations";

export async function increaseNumberOfLinesInPluscodeLvl3By(
  count,
  id,
  currentNumberOfLines
) {
  try {
    const response = await API.graphql(
      graphqlOperation(updatePlusCodeLevel3, {
        input: {
          id: id,
          numberOfLines: currentNumberOfLines + count,
        },
      })
    );

    console.log("GraphQL numberOfLines in pluscode lvl 3 successfully updated");
  } catch (err) {
    console.log("Error updating numberOfLines in pluscode lvl 3 ");
  }
}
