import { API, graphqlOperation } from "aws-amplify";
import { createCoordinates } from "../../../mutations";

export async function createGraphQLCoordinateType(lat, lng) {
  try {
    const response = await API.graphql(
      graphqlOperation(createCoordinates, {
        input: { lat: lat, lng: lng },
      })
    );

    console.log(
      "GraphQL Coordinate type successfully made   " +
        JSON.stringify(response.data.createCoordinates.id)
    );

    return response.data.createCoordinates.id;
  } catch (err) {
    console.log("Error creating GraphQL Coordinate type:", err);
    return "No ID";
  }
}
