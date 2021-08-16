import { API, graphqlOperation } from "aws-amplify";
import { pluscode2ByCompletePluscode } from "../../../queries";

export async function getAllLvl3UnderLvl2(param) {
  try {
    const response = await API.graphql(
      graphqlOperation(pluscode2ByCompletePluscode, {
        completePluscode: param.withThisLvl2Pluscode,
      })
    );

    return response.data.pluscode2ByCompletePluscode.items[0].level3List.items;
  } catch (err) {
    return [];
  }
}
