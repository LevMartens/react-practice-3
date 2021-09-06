import { API, graphqlOperation } from "aws-amplify";
import { createLines } from "../../../mutations";

export async function saveLine(input) {
  try {
    const response = await API.graphql(
      graphqlOperation(createLines, {
        input: input,
      })
    );
    const {
      data: {
        createLines: { id },
      },
    } = response;

    return id !== null
      ? {
          isNOTSaved: false,
          data: createLines,
        }
      : {
          isNOTSaved: true,
          data: createLines,
        };
  } catch (err) {
    console.log("ERROR: Error creating Line:", err);
    return { isNOTSaved: true };
  }
}
