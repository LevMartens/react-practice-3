import { API, graphqlOperation } from "aws-amplify";
import { createLines } from "../../../mutations";

export async function saveLine(input) {
  try {
    const response = await API.graphql(
      graphqlOperation(createLines, {
        input: input,
      })
    );

    console.log(
      "GraphQL Line successfully made, id:" +
        JSON.stringify(response.data.createLines)
    );
    return response.data.createLines.id !== null
      ? {
          isNOTSaved: false,
          data: response.data.createLines,
        }
      : {
          isNOTSaved: true,
          data: response.data.createLines,
        };
  } catch (err) {
    console.log("Error creating Line:", err);
    return { isNOTSaved: true };
  }
}
