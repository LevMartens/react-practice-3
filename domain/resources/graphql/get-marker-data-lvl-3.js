import { API, graphqlOperation } from "aws-amplify";
import { pluscode3ByCompletePluscode } from "../../../src/queries";

//TODO not used at the moment, check if still in use

export async function getMarkerDataLvl3(completePluscode) {
  try {
    const response = await API.graphql(
      graphqlOperation(pluscode3ByCompletePluscode, {
        completePluscode: completePluscode,
      })
    );

    console.log(
      "Total numbers fetched: " +
        JSON.stringify(
          response.data.pluscode3ByCompletePluscode.items[0].numberOfLines
        )
    );
    return response.data.pluscode3ByCompletePluscode.items[0];
  } catch (err) {
    console.log("No lines under lvl 3 ");
    return { numberOfLines: null };
  }
}
