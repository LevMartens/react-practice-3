import { API, graphqlOperation } from "aws-amplify";
import { createLineDrafts } from "../../../mutations";

export async function saveLineDraft(input) {
  try {
    const response = await API.graphql(
      graphqlOperation(createLineDrafts, {
        input: input,
      })
    );

    const {
      data: {
        createLineDrafts: { id },
      },
    } = response;

    return id !== null
      ? {
          isNOTSaved: false,
          data: createLineDrafts,
        }
      : {
          isNOTSaved: true,
          data: createLineDrafts,
        };
  } catch (err) {
    console.log("ERROR: Error creating Line Draft:", err);
    return { isNOTSaved: true };
  }
}
