import { API, graphqlOperation } from "aws-amplify";
import { pluscode2ByCompletePluscode } from "../../../queries";

//TODO: destructering test paused, waiting for lines to fetch

export async function getAllLvl3UnderLvl2(param) {
  try {
    const response = await API.graphql(
      graphqlOperation(pluscode2ByCompletePluscode, {
        completePluscode: param.withThisLvl2Pluscode,
      })
    );

    //response.data.pluscode2ByCompletePluscode.items[0].level3List.items;
    const {
      data: {
        pluscode2ByCompletePluscode: {
          items: [
            {
              level3List: { items },
            },
          ],
        },
      },
    } = response;

    console.log(
      "TEST: DD destructering items " +
        items +
        " source: get-all-lvl-3-under-lvl-2.js"
    );

    return items === undefined ? [] : items;
  } catch (err) {
    return [];
  }
}
