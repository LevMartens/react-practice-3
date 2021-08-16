import { API, graphqlOperation } from "aws-amplify";
import { createLines } from "../../../mutations";

export async function createGraphQLLine(
  startingPointID,
  endPointID,
  parentID,
  completePluscode
) {
  try {
    const response = await API.graphql(
      graphqlOperation(createLines, {
        input: {
          parentId: parentID,
          linesPluscodeParentId: parentID,
          complete3LevelPluscode: completePluscode,
          linesStartingCoordinatesId: startingPointID,
          linesFinishCoordinatesId: endPointID,
        },
      })
    );

    console.log(
      "GraphQL Line successfully made, id:" +
        JSON.stringify(response.data.createLines.id)
    );
    return response.data.createLines.id;
  } catch (err) {
    console.log("Error creating Line:", err);
    return "No ID";
  }
}
