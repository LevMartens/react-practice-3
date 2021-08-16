import { API, graphqlOperation } from "aws-amplify";
import { updatePlusCodeLevel1 } from "../../../mutations";

export async function increaseNumberOfLinesInPluscodeLvl1By(
  count,
  id,
  currentNumberOfLines
) {
  try {
    const response = await API.graphql(
      graphqlOperation(updatePlusCodeLevel1, {
        input: {
          id: id,
          numberOfLines: currentNumberOfLines + count,
        },
      })
    );

    console.log("GraphQL numberOfLines in pluscode lvl 1 successfully updated");
  } catch (err) {
    console.log("Error updating numberOfLines in pluscode lvl 1 ");
  }
}
