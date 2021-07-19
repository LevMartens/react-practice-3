import { API, graphqlOperation } from "aws-amplify";
import { pluscodeByDigits } from "../../../src/queries";

export async function getAllLvl2UnderLvl1(lvl1Digits) {
  try {
    const response = await API.graphql(
      graphqlOperation(pluscodeByDigits, {
        digits: lvl1Digits,
      })
    );

    return response.data.pluscodeByDigits.items[0].level2List.items;
  } catch (err) {
    console.log("No lvl 2 under lvl 1 ");
    return [];
  }
}
