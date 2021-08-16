import { API, graphqlOperation } from "aws-amplify";
import { updatePlusCodeLevel2 } from "../../../mutations";

export async function increaseNumberOfLinesInPluscodeLvl2By(
  count,
  id,
  currentNumberOfLines
) {
  try {
    const response = await API.graphql(
      graphqlOperation(updatePlusCodeLevel2, {
        input: {
          id: id,
          numberOfLines: currentNumberOfLines + count,
        },
      })
    );

    console.log("GraphQL numberOfLines in pluscode lvl 2 successfully updated");
  } catch (err) {
    console.log("Error updating numberOfLines in pluscode lvl 2 ");
  }
}
