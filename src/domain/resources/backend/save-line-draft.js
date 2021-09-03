import { API, graphqlOperation } from "aws-amplify";
import { createLineDrafts } from "../../../mutations";

export async function saveLineDraft(input) {
  try {
    const response = await API.graphql(
      graphqlOperation(createLineDrafts, {
        input: input,
      })
    );

    console.log(
      "LOG: GraphQL Line successfully made, id: " +
        JSON.stringify(response.data.createLineDrafts.id)
    );

    return response.data.createLineDrafts.id !== null
      ? {
          isNOTSaved: false,
          data: response.data.createLineDrafts,
        }
      : {
          isNOTSaved: true,
          data: response.data.createLineDrafts,
        };
  } catch (err) {
    console.log("ERROR: Error creating Line Draft:", err);
    return { isNOTSaved: true };
  }
}
