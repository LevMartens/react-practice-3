import { API, graphqlOperation } from "aws-amplify";
import { pluscodeByDigits } from "../../../queries";

export async function getAllLvl2UnderLvl1(lvl1Digits) {
  try {
    const response = await API.graphql(
      graphqlOperation(pluscodeByDigits, {
        digits: lvl1Digits,
      })
    );

    const {data: {pluscodeByDigits: {items: [{level2List:{items}}]}}}

    return items;
  } catch (err) {
    console.log("WARNING: No lvl 2 under lvl 1 ");
    return [];
  }
}
