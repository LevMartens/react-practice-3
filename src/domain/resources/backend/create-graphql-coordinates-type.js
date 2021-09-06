import { API, graphqlOperation } from "aws-amplify";
import { createCoordinates } from "../../../mutations";

export async function createGraphQLCoordinateType(lat, lng) {
  try {
    const response = await API.graphql(
      graphqlOperation(createCoordinates, {
        input: { lat: lat, lng: lng },
      })
    );
    const {
      data: {
        createCoordinates: { id },
      },
    } = response;

    return id;
  } catch (err) {
    console.log("WARNING: creating GraphQL Coordinate type:", err);
    return "No ID";
  }
}
